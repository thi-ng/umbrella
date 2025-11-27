// SPDX-License-Identifier: Apache-2.0
import { align } from "@thi.ng/binary/align";
import { defBitField, type BitField } from "@thi.ng/bitfield/bitfield";
import { isString } from "@thi.ng/checks/is-string";
import { assert } from "@thi.ng/errors/assert";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { ILogger } from "@thi.ng/logger";
import { NULL_LOGGER } from "@thi.ng/logger/null";
import { preferredTypeForPath } from "@thi.ng/mime";
import {
	EntryType,
	type IBlockStorage,
	type IDirectory,
	type IEntry,
} from "./api.js";
import { Directory } from "./directory.js";
import { Entry } from "./entry.js";
import { Lock } from "./lock.js";
import { decodeBytes, encodeBytes } from "./utils.js";

export interface BlockFSOpts {
	/**
	 * Path separator.
	 *
	 * @defaultValue `/`
	 */
	separator: string;
	/**
	 * Logger instance to use.
	 */
	logger: ILogger;
	/**
	 * Customizable {@link IDirectory} factory function. By default creates
	 * {@link Directory} views of given {@link IEntry}.
	 *
	 * @param fs
	 * @param entry
	 */
	directory: (fs: BlockFS, entry: IEntry) => IDirectory;
	/**
	 * Customizable filesystem entry implementation. Also see
	 * {@link DEFAULT_ENTRY}.
	 */
	entry: {
		/** Entry size in bytes */
		readonly size: number;
		/** Max number of bytes in entry name (per directory). Default impl. uses 31 */
		readonly maxLength: number;
		/**
		 * Factory function to define a new entry instance, a memory-mapped view
		 * of given byte array chunk.
		 *
		 * @param fs
		 * @param parent
		 * @param blockID
		 * @param data
		 * @param offset
		 */
		factory: (
			fs: BlockFS,
			parent: IDirectory | null,
			blockID: number,
			data: Uint8Array,
			offset: number
		) => IEntry;
	};
}

/**
 * Default {@link IEnty} implementation
 */
export const DEFAULT_ENTRY: BlockFSOpts["entry"] = {
	size: Entry.SIZE,
	maxLength: Entry.NAME_MAX_LENGTH,
	factory(fs, parent, blockID, data, offset) {
		return new Entry(fs, parent, blockID, data, offset);
	},
};

export class BlockFS {
	protected blockIndex!: BitField;
	protected lock = new Lock();
	/** Temporaty block/scratch storage space */
	protected tmp: Uint8Array;

	/** Configuration options */
	readonly opts: BlockFSOpts;
	/** Number of bytes needed to store block ID (max. 4 bytes) */
	readonly blockIDBytes: number;
	/** Number of bytes needed to store data size in a block */
	readonly blockDataSizeBytes: number;
	/** Number of usable data bytes per block */
	readonly blockDataSize: number;
	/** Start byte offset of data in a block */
	readonly blockDataOffset: number;
	/** Block ID of root dir */
	readonly rootDirBlockID: number;
	/** Index of first data block (after the block table) */
	readonly dataStartBlockID: number;
	/** Special block ID to mark EOF */
	readonly sentinelID: number;
	/** Start byte offset of first entry in a directory block */
	readonly dirDataOffset: number;
	/** Root directory */
	root!: IDirectory;

	constructor(public storage: IBlockStorage, opts?: Partial<BlockFSOpts>) {
		this.opts = {
			directory: (fs, entry) => new Directory(fs, entry),
			entry: DEFAULT_ENTRY,
			logger: NULL_LOGGER,
			separator: "/",
			...opts,
		};
		assert(
			storage.blockSize > this.opts.entry.size,
			`too small block size, require at least: ${this.opts.entry.size} bytes`
		);
		this.blockIndex = defBitField(storage.numBlocks);
		this.blockIDBytes =
			align(Math.ceil(Math.log2(storage.numBlocks)), 8) >> 3;
		this.blockDataSizeBytes =
			align(Math.ceil(Math.log2(storage.blockSize)), 8) >> 3;
		this.blockDataOffset = this.blockIDBytes + this.blockDataSizeBytes;
		this.blockDataSize = storage.blockSize - this.blockDataOffset;
		this.rootDirBlockID =
			align(this.blockIndex.data.length, storage.blockSize) /
			storage.blockSize;
		this.dataStartBlockID = this.rootDirBlockID + 1;
		this.dirDataOffset = this.blockDataOffset + this.blockIDBytes;
		this.sentinelID = 2 ** (this.blockIDBytes * 8) - 1;
		this.tmp = new Uint8Array(storage.blockSize);
	}

	async init() {
		const { blockIndex, storage, opts, rootDirBlockID } = this;
		const indexSize = blockIndex.data.length;
		const blockSize = storage.blockSize;
		for (let i = 0; i < rootDirBlockID; i++) {
			const data = await storage.loadBlock(i);
			const offset = i * blockSize;
			if (offset + data.length > indexSize) {
				blockIndex.data.set(
					data.subarray(0, indexSize - offset),
					offset
				);
			} else {
				blockIndex.data.set(data, offset);
			}
		}
		blockIndex.fill(1, 0, this.dataStartBlockID);
		const rootEntry = opts.entry.factory(
			this,
			null,
			rootDirBlockID,
			new Uint8Array(opts.entry.size),
			0
		);
		rootEntry.set({
			name: "",
			type: EntryType.DIR,
			start: rootDirBlockID,
			owner: 0,
		});
		this.root = opts.directory(this, rootEntry);
		return this;
	}

	/**
	 * Attempts to find the {@link IEntry} for given `path` and returns it if
	 * successful. Throws error if no such path exists.
	 *
	 * @remarks
	 * Also see {@link BlockFS.ensureEntryForPath}.
	 *
	 * @param path
	 */
	async entryForPath(path: string) {
		let dir = this.root;
		const { directory, separator } = this.opts;
		if (path[0] === separator) path = path.substring(1);
		if (path === "") return dir.entry;
		const $path = path.split(separator);
		for (let i = 0, len = $path.length - 1; i <= len; i++) {
			let entry = await dir.findName($path[i]);
			if (!entry) break;
			if (i === len) return entry;
			if (!entry.isDirectory()) illegalArgs(path);
			dir = directory(this, entry);
		}
		illegalArgs(path);
	}

	/**
	 * Attempts to find or to create the {@link IEntry} for given `path` and
	 * entry type (file or directory) and then returns it if successful. Throws
	 * error if the path exists, but does not match the expected type or if the
	 * entry could not be created for other reasons.
	 *
	 * @remarks
	 * Also see {@link BlockFS.entryForPath}.
	 *
	 * @param path
	 * @param type
	 */
	async ensureEntryForPath(path: string, type: EntryType) {
		let dir = this.root;
		const { directory, separator } = this.opts;
		if (path[0] === separator) path = path.substring(1);
		if (path === "") return dir.entry;
		const $path = path.split(separator);
		for (let i = 0, len = $path.length - 1; i <= len; i++) {
			let entry = await dir.findName($path[i]);
			if (!entry) {
				if (i < len) {
					entry = await dir.mkdir($path[i]);
				} else {
					return await dir.addEntry({
						type,
						name: $path[i],
						start: this.sentinelID,
					});
				}
			}
			if (i === len) {
				if (entry.type !== type)
					illegalArgs(
						`path exists, but is not a ${EntryType[type]}: ${path}`
					);
				return entry;
			}
			if (!entry.isDirectory()) illegalArgs(path);
			dir = directory(this, entry);
		}
		illegalArgs(path);
	}

	/**
	 * Attempts to allocate a number of free blocks required for storing the
	 * given number of `bytes`. If successful, marks the blocks as used in the
	 * allocation table and then returns list of their IDs, otherwise throws an
	 * error if there're insufficient blocks available.
	 *
	 * @param bytes
	 */
	async allocateBlocks(bytes: number) {
		const {
			blockDataSize,
			blockIndex,
			dataStartBlockID,
			lock,
			sentinelID,
		} = this;
		const lockID = await lock.acquire();
		try {
			const ids: number[] = [];
			let last = dataStartBlockID;
			while (bytes > 0) {
				const next = blockIndex.firstZero(last);
				if (next < 0 || next >= sentinelID) {
					throw new Error(
						`insufficient free blocks for storing ${bytes} bytes`
					);
				}
				ids.push(next);
				last = next + 1;
				bytes -= blockDataSize;
			}
			await this.updateBlockIndex(ids, 1);
			return ids;
		} finally {
			await lock.release(lockID);
		}
	}

	/**
	 * Marks the given block IDs as free/unused in the block allocation table
	 * and deletes/clears the blocks.
	 *
	 * @param ids
	 */
	async freeBlocks(ids: number[]) {
		const lockID = await this.lock.acquire();
		try {
			await this.updateBlockIndex(ids, 0);
			await Promise.all(ids.map((id) => this.storage.deleteBlock(id)));
		} finally {
			await this.lock.release(lockID);
		}
	}

	/**
	 * Same as POSIX `mkdirp`. Attempts to create given directory, including any
	 * missing intermediate ones defined by `path`.
	 *
	 * @param path
	 */
	async mkdir(path: string) {
		return this.ensureEntryForPath(path, EntryType.DIR);
	}

	/**
	 * Async iterator. Reads block list for given `path` (file path or start
	 * block ID) and yields data contents (byte arrays) of each block.
	 *
	 * @remarks
	 * Also see other read methods:
	 *
	 * - {@link BlockFS.readFile}
	 * - {@link BlockFS.readText}
	 * - {@link BlockFS.readJSON}
	 *
	 * @param path
	 */
	async *readBlocks(path: string | number) {
		let blockID = isString(path)
			? (await this.entryForPath(path)).start
			: path;
		const { blockDataOffset, blockIndex, sentinelID, storage } = this;
		while (true) {
			if (!blockIndex.at(blockID)) {
				throw new Error(`invalid block ref: ${blockID}`);
			}
			const bytes = await storage.loadBlock(blockID);
			const { next, size } = this.getBlockMeta(bytes);
			yield bytes.subarray(blockDataOffset, blockDataOffset + size);
			if (next === sentinelID) return;
			blockID = next;
		}
	}

	/**
	 * Fully reads given file into a single byte buffer and returns it.
	 *
	 * @param path
	 */
	async readFile(path: string | number) {
		const buffer = [];
		for await (let block of this.readBlocks(path)) buffer.push(...block);
		return new Uint8Array(buffer);
	}

	/**
	 * Fully reads given file into a single UTF-8 byte buffer, then decodes and
	 * returns it as string.
	 *
	 * @param path
	 */
	async readText(path: string | number) {
		return new TextDecoder().decode(await this.readFile(path));
	}

	/**
	 * Fully reads given file into a single UTF-8 byte buffer, then decodes it
	 * as JSON and returns result.
	 *
	 * @param path
	 */
	async readJSON<T>(path: string | number) {
		return <T>JSON.parse(await this.readText(path));
	}

	/**
	 * Fully reads given file into a single byte buffer and returns it as blob
	 * object URL, optionally typed with given MIME type.
	 *
	 * @remarks
	 * If `type` is omitted, it will be attempted to be inferred automatically
	 * via [thi.ng/mime](https://thi.ng/mime).
	 *
	 * @remarks
	 * Reference:
	 *
	 * - https://developer.mozilla.org/en-US/docs/Web/API/Blob#creating_a_url_representing_the_contents_of_a_typed_array
	 *
	 * @param path
	 * @param type
	 */
	async readAsObjectURL(path: string | number, type?: string) {
		return URL.createObjectURL(
			new Blob([await this.readFile(path)], {
				type:
					type ??
					(isString(path) ? preferredTypeForPath(path) : undefined),
			})
		);
	}

	/**
	 * Takes an array of block IDs (or `null`) and a `data` byte array. Writes
	 * chunks of data into given blocks and connecting each block as linked
	 * list. Returns object of start/end block IDs and data size.
	 *
	 * @remarks
	 * If `blocks` is null, blocks are automatically allocated via
	 * {@link BlockFS.allocateBlocks}.
	 *
	 * @param blocks
	 * @param data
	 */
	async writeBlocks(blocks: number[] | null, data: Uint8Array) {
		const { blockDataOffset, blockDataSize, sentinelID, storage } = this;
		if (!blocks) blocks = await this.allocateBlocks(data.length);
		this.opts.logger.debug("allocated blocks", blocks.length, blocks);
		let offset = 0;
		for (let i = 0, numBlocks = blocks.length - 1; i <= numBlocks; i++) {
			if (offset >= data.length)
				illegalState(`too many blocks, EOF already reached`);
			const id = blocks[i];
			const block = await storage.loadBlock(id);
			i < numBlocks
				? this.setBlockMeta(block, blocks[i + 1], blockDataSize)
				: this.setBlockMeta(block, sentinelID, data.length - offset);
			const chunk = data.subarray(offset, offset + blockDataSize);
			block.set(chunk, blockDataOffset);
			if (chunk.length < blockDataSize) {
				block.fill(0, blockDataOffset + chunk.length);
			}
			await storage.saveBlock(id, block);
			offset += blockDataSize;
		}
		return {
			start: blocks[0],
			end: blocks[blocks.length - 1],
			size: Math.min(data.length, offset),
		};
	}

	async writeFile(path: string | null, data: Uint8Array | string) {
		if (isString(data)) data = new TextEncoder().encode(data);
		if (!path) return this.writeBlocks(null, data);
		const entry = await this.ensureEntryForPath(path, EntryType.FILE);
		let blocks = await this.blockList(entry.start);
		const overflow = data.length - blocks.length * this.blockDataSize;
		if (overflow > 0) {
			blocks.push(...(await this.allocateBlocks(overflow)));
		} else if (overflow < 0) {
			const needed = Math.ceil(data.length / this.blockDataSize);
			await this.freeBlocks(blocks.slice(needed));
			blocks = blocks.slice(0, needed);
		}
		blocks.sort((a, b) => a - b);
		entry.start = blocks[0];
		entry.end = blocks[blocks.length - 1];
		entry.size = BigInt(data.length);
		entry.mtime = Date.now();
		await entry.save();
		return this.writeBlocks(blocks, data);
	}

	async appendBlocks(blockID: number, data: Uint8Array) {
		if (blockID === this.sentinelID) return this.writeBlocks(null, data);
		const { blockDataOffset, blockDataSize, storage } = this;
		const blocks = await this.blockList(blockID);
		const lastBlockID = blocks[blocks.length - 1];
		const lastBlock = await storage.loadBlock(lastBlockID);
		const currLength = decodeBytes(
			lastBlock,
			this.blockIDBytes,
			this.blockDataSizeBytes
		);
		const remaining = blockDataSize - currLength;
		lastBlock.fill(0, 0, blockDataOffset);
		lastBlock.set(
			data.subarray(0, remaining),
			blockDataOffset + currLength
		);
		let newEndBlockID: number;
		if (data.length > remaining) {
			const { start, end } = await this.writeBlocks(
				null,
				data.subarray(remaining)
			);
			this.setBlockMeta(lastBlock, start, blockDataSize);
			newEndBlockID = end;
		} else {
			this.setBlockMeta(
				lastBlock,
				this.sentinelID,
				currLength + data.length
			);
			newEndBlockID = lastBlockID;
		}
		await storage.saveBlock(lastBlockID, lastBlock);
		return { start: blockID, end: newEndBlockID };
	}

	async appendFile(path: string | number, data: Uint8Array | string) {
		if (isString(data)) data = new TextEncoder().encode(data);
		if (!isString(path)) return this.appendBlocks(path, data);
		const entry = await this.ensureEntryForPath(path, EntryType.FILE);
		const { start, end } = await this.appendBlocks(entry.end, data);
		if (entry.start === this.sentinelID) entry.start = start;
		entry.end = end;
		entry.size += BigInt(data.length);
		entry.mtime = Date.now();
		await entry.save();
		return { start: entry.start, end: entry.end, size: Number(entry.size) };
	}

	async deleteFile(path: string | number) {
		if (isString(path)) {
			const entry = await this.entryForPath(path);
			if (entry.isDirectory()) illegalArgs("path is a directory");
			await this.freeBlocks(await this.blockList(entry.start));
			entry.release();
			await entry.save();
		} else {
			await this.freeBlocks(await this.blockList(path));
		}
	}

	async blockList(blockID: number) {
		const { blockIDBytes, sentinelID, storage } = this;
		const blocks: number[] = [];
		if (blockID === sentinelID) return blocks;
		while (true) {
			blocks.push(blockID);
			const block = await storage.loadBlock(blockID);
			const nextID = decodeBytes(block, 0, blockIDBytes);
			if (nextID === sentinelID) break;
			blockID = nextID;
		}
		return blocks;
	}

	protected async updateBlockIndex(ids: number[], state: number) {
		const { blockIndex, storage, tmp } = this;
		const blockSize = storage.blockSize;
		const updatedBlocks = new Set<number>();
		for (const id of ids) {
			blockIndex.setAt(id, state);
			updatedBlocks.add(((id >>> 3) / blockSize) | 0);
		}
		for (const id of updatedBlocks) {
			this.opts.logger.debug("update block index", id);
			const chunk = blockIndex.data.subarray(
				id * blockSize,
				(id + 1) * blockSize
			);
			tmp.set(chunk);
			if (chunk.length < blockSize) tmp.fill(0, chunk.length);
			await storage.saveBlock(id, tmp);
		}
	}

	/** @internal */
	getBlockMeta(block: Uint8Array) {
		return {
			next: decodeBytes(block, 0, this.blockIDBytes),
			size: decodeBytes(
				block,
				this.blockIDBytes,
				this.blockDataSizeBytes
			),
		};
	}

	/** @internal */
	setBlockMeta(block: Uint8Array, next: number, num: number) {
		this.setBlockLink(block, next);
		this.setBlockDataLength(block, num);
	}

	/** @internal */
	setBlockLink(block: Uint8Array, next: number, offset = 0) {
		encodeBytes(block, next, offset, this.blockIDBytes);
	}

	/** @internal */
	setBlockDataLength(
		block: Uint8Array,
		num: number,
		offset = this.blockIDBytes
	) {
		encodeBytes(block, num, offset, this.blockDataSizeBytes);
	}
}
