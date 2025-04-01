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
	 * Customizable directory/file entry implementation. Also see
	 * {@link DEFAULT_ENTRY}.
	 */
	entry: {
		/** Entry size in bytes */
		readonly size: number;
		/** Max number of bytes in entry name (per directory). Default impl. uses 31 */
		readonly maxLength: number;
		/** Factory function to define a new entry */
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
	rootDir!: Directory;

	constructor(public storage: IBlockStorage, opts?: Partial<BlockFSOpts>) {
		this.opts = {
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
		this.rootDir = new Directory(this, rootEntry);
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
			if (entry.type !== EntryType.DIR) illegalArgs(path);
			dir = new Directory(this, entry);
		}
		illegalArgs(path);
	}

	async blockForEntry(path: string | number) {
		return isString(path) ? (await this.entryForPath(path)).start : path;
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

	async *readFile(blockID: number) {
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

	async readText(path: number | string) {
		const blockID = await this.blockForEntry(path);
		const buffer = [];
		for await (let block of this.readFile(blockID)) buffer.push(...block);
		return new TextDecoder().decode(new Uint8Array(buffer));
	}

	async readJSON(blockID: number) {
		return JSON.parse(await this.readText(blockID));
	}

	async writeFile(data: Uint8Array) {
		let offset = 0;
		const blocks = await this.allocateBlocks(data.length);
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
			block.set(
				data.subarray(offset, offset + this.blockDataSize),
				this.blockDataOffset
			);
			await this.storage.saveBlock(id, block);
			offset += this.blockDataSize;
		}
		return {
			start: blocks[0],
			end: blocks[blocks.length - 1],
			size: data.length,
		};
	}

	writeText(text: string) {
		return this.writeFile(new TextEncoder().encode(text));
	}

	async appendFile(blockID: number, data: Uint8Array) {
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
			const { start, end } = await this.writeFile(
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

	appendText(blockID: number, text: string) {
		return this.appendFile(blockID, new TextEncoder().encode(text));
	}

	async deleteFile(blockID: number) {
		return this.freeBlocks(await this.blockList(blockID));
	}

	async blockList(blockID: number) {
		const blocks: number[] = [];
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
		const tmp = new Uint8Array(blockSize);
		for (let id of updatedBlocks) {
			this.storage.logger!.debug("update block index", id);
			const chunk = this.blockIndex.data.subarray(
				id * blockSize,
				(id + 1) * blockSize
			);
			tmp.set(chunk);
			if (chunk.length < blockSize) tmp.fill(0, chunk.length);
			await this.storage.saveBlock(id, tmp);
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
