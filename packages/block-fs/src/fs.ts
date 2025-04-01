// SPDX-License-Identifier: Apache-2.0
import { align } from "@thi.ng/binary/align";
import { defBitField, type BitField } from "@thi.ng/bitfield/bitfield";
import { isString } from "@thi.ng/checks/is-string";
import { assert } from "@thi.ng/errors/assert";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
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
	rootDir!: IDirectory;

	constructor(public storage: IBlockStorage, opts?: Partial<BlockFSOpts>) {
		this.opts = {
			directory: (fs, entry) => new Directory(fs, entry),
			entry: DEFAULT_ENTRY,
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
		this.sentinelID = storage.numBlocks - 1;
		this.tmp = new Uint8Array(storage.blockSize);
	}

	async init() {
		const indexSize = this.blockIndex.data.length;
		const blockSize = this.storage.blockSize;
		for (let i = 0; i < this.rootDirBlockID; i++) {
			const data = await this.storage.loadBlock(i);
			const offset = i * blockSize;
			if (offset + data.length > indexSize) {
				this.blockIndex.data.set(
					data.subarray(0, indexSize - offset),
					offset
				);
			} else {
				this.blockIndex.data.set(data, offset);
			}
		}
		this.blockIndex.fill(1, 0, this.dataStartBlockID);
		const rootEntry = this.opts.entry.factory(
			this,
			null,
			this.rootDirBlockID,
			new Uint8Array(this.opts.entry.size),
			0
		);
		rootEntry.set({
			name: "",
			type: EntryType.DIR,
			start: this.rootDirBlockID,
			owner: 0,
		});
		this.rootDir = this.opts.directory(this, rootEntry);
		return this;
	}

	async entryForPath(path: string) {
		let dir = this.rootDir;
		if (path[0] === "/") path = path.substring(1);
		if (path === "") return dir.entry;
		const $path = path.split("/");
		for (let i = 0; i < $path.length; i++) {
			let entry = await dir.findName($path[i]);
			if (!entry) break;
			if (i === $path.length - 1) return entry;
			if (!entry.isDirectory()) illegalArgs(path);
			dir = this.opts.directory(this, entry);
		}
		illegalArgs(path);
	}

	async ensureEntryForPath(path: string, type: EntryType) {
		let dir = this.rootDir;
		if (path[0] === "/") path = path.substring(1);
		if (path === "") return dir.entry;
		const $path = path.split("/");
		for (let i = 0; i < $path.length; i++) {
			let entry = await dir.findName($path[i]);
			if (!entry) {
				if (i < $path.length - 1) {
					entry = await dir.mkdir($path[i]);
				} else {
					return await dir.addEntry({
						type,
						name: $path[i],
						start: this.sentinelID,
					});
				}
			}
			if (i === $path.length - 1) return entry;
			if (!entry.isDirectory()) illegalArgs(path);
			dir = this.opts.directory(this, entry);
		}
		illegalArgs(path);
	}

	async allocateBlocks(bytes: number) {
		const lockID = await this.lock.acquire();
		try {
			const ids: number[] = [];
			let last = this.dataStartBlockID;
			while (bytes > 0) {
				const next = this.blockIndex.firstZero(last);
				if (next < 0 || next >= this.sentinelID) {
					throw new Error(
						`insufficient free blocks for storing ${bytes} bytes`
					);
				}
				ids.push(next);
				last = next + 1;
				bytes -= this.blockDataSize;
			}
			await this.updateBlockIndex(ids, 1);
			return ids;
		} finally {
			await this.lock.release(lockID);
		}
	}

	async freeBlocks(ids: number[]) {
		const lockID = await this.lock.acquire();
		try {
			await this.updateBlockIndex(ids, 0);
			await Promise.all(ids.map((id) => this.storage.deleteBlock(id)));
		} finally {
			await this.lock.release(lockID);
		}
	}

	async *readFile(path: string | number) {
		let blockID = isString(path)
			? (await this.entryForPath(path)).start
			: path;
		while (true) {
			if (!this.blockIndex.at(blockID)) {
				throw new Error(`invalid block ref: ${blockID}`);
			}
			const bytes = await this.storage.loadBlock(blockID);
			const { next, size } = this.getBlockMeta(bytes);
			yield bytes.subarray(
				this.blockDataOffset,
				this.blockDataOffset + size
			);
			if (next === this.sentinelID) return;
			blockID = next;
		}
	}

	async readText(path: string | number) {
		const buffer = [];
		for await (let block of this.readFile(path)) buffer.push(...block);
		return new TextDecoder().decode(new Uint8Array(buffer));
	}

	async readJSON(path: string | number) {
		return JSON.parse(await this.readText(path));
	}

	async writeFileRaw(blocks: number[] | null, data: Uint8Array) {
		if (!blocks) blocks = await this.allocateBlocks(data.length);
		let offset = 0;
		for (let i = 0, numBlocks = blocks.length - 1; i <= numBlocks; i++) {
			const id = blocks[i];
			const block = await this.storage.loadBlock(id);
			i < numBlocks
				? this.setBlockMeta(block, blocks[i + 1], this.blockDataSize)
				: this.setBlockMeta(
						block,
						this.sentinelID,
						data.length - offset
				  );
			const chunk = data.subarray(offset, offset + this.blockDataSize);
			block.set(chunk, this.blockDataOffset);
			if (chunk.length < this.blockDataSize) {
				block.fill(0, this.blockDataOffset + chunk.length);
			}
			await this.storage.saveBlock(id, block);
			offset += this.blockDataSize;
		}
		return {
			start: blocks[0],
			end: blocks[blocks.length - 1],
			size: Math.min(data.length, offset),
		};
	}

	async writeFile(path: string | null, data: Uint8Array | string) {
		if (isString(data)) data = new TextEncoder().encode(data);
		if (!path) return this.writeFileRaw(null, data);
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
		blocks.sort();
		entry.start = blocks[0];
		entry.end = blocks[blocks.length - 1];
		entry.size = BigInt(data.length);
		entry.mtime = Date.now();
		await entry.save();
		return this.writeFileRaw(blocks, data);
	}

	async appendFileRaw(blockID: number, data: Uint8Array) {
		if (blockID === this.sentinelID) return this.writeFileRaw(null, data);
		const blocks = await this.blockList(blockID);
		const lastBlockID = blocks[blocks.length - 1];
		const lastBlock = await this.storage.loadBlock(lastBlockID);
		const currLength = decodeBytes(
			lastBlock,
			this.blockIDBytes,
			this.blockDataSizeBytes
		);
		const remaining = this.blockDataSize - currLength;
		lastBlock.fill(0, 0, this.blockDataOffset);
		lastBlock.set(
			data.subarray(0, remaining),
			this.blockDataOffset + currLength
		);
		let newEndBlockID: number;
		if (data.length > remaining) {
			const { start, end } = await this.writeFileRaw(
				null,
				data.subarray(remaining)
			);
			this.setBlockMeta(lastBlock, start, this.blockDataSize);
			newEndBlockID = end;
		} else {
			this.setBlockMeta(
				lastBlock,
				this.sentinelID,
				currLength + data.length
			);
			newEndBlockID = lastBlockID;
		}
		await this.storage.saveBlock(lastBlockID, lastBlock);
		return { start: blockID, end: newEndBlockID };
	}

	async appendFile(path: string | number, data: Uint8Array | string) {
		if (isString(data)) data = new TextEncoder().encode(data);
		if (!isString(path)) return this.appendFileRaw(path, data);
		const entry = await this.ensureEntryForPath(path, EntryType.FILE);
		const { start, end } = await this.appendFileRaw(entry.end, data);
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
		const blocks: number[] = [];
		if (blockID === this.sentinelID) return blocks;
		while (true) {
			blocks.push(blockID);
			const block = await this.storage.loadBlock(blockID);
			const nextID = decodeBytes(block, 0, this.blockIDBytes);
			if (nextID === this.sentinelID) break;
			blockID = nextID;
		}
		return blocks;
	}

	protected async updateBlockIndex(ids: number[], state: number) {
		const blockSize = this.storage.blockSize;
		const updatedBlocks = new Set<number>();
		for (let id of ids) {
			this.blockIndex.setAt(id, state);
			updatedBlocks.add(((id >>> 3) / blockSize) | 0);
		}
		for (let id of updatedBlocks) {
			this.storage.logger!.debug("update block index", id);
			const chunk = this.blockIndex.data.subarray(
				id * blockSize,
				(id + 1) * blockSize
			);
			this.tmp.set(chunk);
			if (chunk.length < blockSize) this.tmp.fill(0, chunk.length);
			await this.storage.saveBlock(id, this.tmp);
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
