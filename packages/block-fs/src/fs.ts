// SPDX-License-Identifier: Apache-2.0
import { align } from "@thi.ng/binary/align";
import { defBitField, type BitField } from "@thi.ng/bitfield/bitfield";
import { assert } from "@thi.ng/errors/assert";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { IBlockStorage } from "./api.js";
import { Lock } from "./lock.js";

export interface BlockFSOpts {}

export class BlockFS {
	protected blockIndex!: BitField;

	protected lock = new Lock();

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
	rootDir!: Directory;

	constructor(public storage: IBlockStorage, public opts: BlockFSOpts) {
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
		this.blockIndex.setRange(0, "1".repeat(this.dataStartBlockID));
		const hasRootDir = await this.storage.hasBlock(this.rootDirBlockID);
		const root = await this.storage.loadBlock(this.rootDirBlockID);
		if (!hasRootDir) this.setBlockMeta(root, this.sentinelID, 0);
		this.rootDir = new Directory(this, this.rootDirBlockID);
		return this;
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

	async readText(blockID: number) {
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
			await this.storage.saveBlock(id);
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
		await this.storage.saveBlock(lastBlockID);
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
		for (let id of updatedBlocks) {
			this.storage.logger!.debug("update block index", id);
			const block = await this.storage.loadBlock(id);
			block.set(
				this.blockIndex.data.subarray(
					id * blockSize,
					(id + 1) * blockSize
				)
			);
			await this.storage.saveBlock(id);
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
	setBlockMeta(block: Uint8Array, next: number, size: number) {
		encodeBytes(block, next, 0, this.blockIDBytes);
		encodeBytes(block, size, this.blockIDBytes, this.blockDataSizeBytes);
	}
}

enum EntryType {
	FILE,
	DIR,
}

export class Directory {
	constructor(
		public fs: BlockFS,
		public blockID: number,
		public parent?: DirEntry
	) {}

	async *[Symbol.asyncIterator]() {
		const { entries } = await this.traverse();
		for (let e of entries) {
			if (!e.free) yield e;
		}
	}

	async traverse() {
		const blocks: number[] = [];
		const entries: DirEntry[] = [];
		let blockID = this.blockID;
		while (true) {
			blocks.push(blockID);
			const block = await this.fs.storage.loadBlock(blockID);
			const { next, size } = this.fs.getBlockMeta(block);
			for (let i = 0; i < size; i++) {
				entries.push(
					new DirEntry(
						block.subarray(
							this.fs.blockDataOffset + i * 52,
							this.fs.blockDataOffset + (i + 1) * 52
						),
						this,
						blockID
					)
				);
			}
			if (next === this.fs.sentinelID) break;
			blockID = next;
		}
		return { blocks, entries };
	}

	async mkdir(name: string) {
		const block = (await this.fs.allocateBlocks(1))[0];
		const data = await this.fs.storage.loadBlock(block);
		this.fs.setBlockMeta(data, this.fs.sentinelID, 0);
		await this.fs.storage.saveBlock(block);
		return this.addEntry({
			name,
			type: EntryType.DIR,
			owner: this.parent?.owner ?? 0,
			start: block,
		});
	}

	async addEntry(spec: DirEntrySpec) {
		const { blocks, entries } = await this.traverse();
		let entry = entries.find((e) => e.free);
		if (entry) {
			entry.free = false;
			entry.set(spec);
			this.fs.storage.saveBlock(entry.blockID);
			return entry;
		}
		let lastBlockID = blocks[blocks.length - 1];
		let lastBlock = await this.fs.storage.loadBlock(lastBlockID);
		let numEntries = decodeBytes(
			lastBlock,
			this.fs.blockIDBytes,
			this.fs.blockDataSizeBytes
		);
		const maxEntriesPerBlock = this.fs.blockDataSize / 52;
		if (numEntries < maxEntriesPerBlock) {
			encodeBytes(
				lastBlock,
				numEntries + 1,
				this.fs.blockIDBytes,
				this.fs.blockDataSizeBytes
			);
			entry = new DirEntry(
				lastBlock.subarray(
					this.fs.blockDataOffset + numEntries * 52,
					this.fs.blockDataOffset + (numEntries + 1) * 52
				),
				this,
				lastBlockID
			);
		} else {
			const newBlockID = (await this.fs.allocateBlocks(52))[0];
			const newBlock = await this.fs.storage.loadBlock(newBlockID);
			encodeBytes(lastBlock, newBlockID, 0, this.fs.blockIDBytes);
			await this.fs.storage.saveBlock(lastBlockID);
			this.fs.setBlockMeta(newBlock, this.fs.sentinelID, 1);
			entry = new DirEntry(
				newBlock.subarray(
					this.fs.blockDataOffset,
					this.fs.blockDataOffset + 52
				),
				this,
				newBlockID
			);
		}
		entry.set(spec);
		this.fs.storage.saveBlock(entry.blockID);
		return entry;
	}
}

interface DirEntrySpec {
	name: string;
	type: EntryType;
	locked?: boolean;
	owner: number;
	size?: number;
	start: number;
	end?: number;
	ctime?: number;
	mtime?: number;
}

class DirEntry {
	constructor(
		public readonly data: Uint8Array,
		public readonly parent: Directory,
		public readonly blockID: number
	) {}

	get free() {
		return !!(this.data[0] & 0b1000_0000);
	}

	set free(free: boolean) {
		if (free) this.data[0] |= 0b1000_0000;
		else this.data[0] &= 0b0111_1111;
	}

	get type() {
		return <EntryType>((this.data[0] >> 6) & 1);
	}

	set type(type: EntryType) {
		if (type) this.data[0] |= 0b0100_0000;
		else this.data[0] &= 0b1011_1111;
	}

	get locked() {
		return !!(this.data[0] & 0b0010_0000);
	}

	set locked(locked: boolean) {
		if (locked) this.data[0] |= 0b0010_0000;
		else this.data[0] &= 0b1101_1111;
	}

	get owner() {
		return this.data[0] & 0b0001_1111;
	}

	set owner(owner: number) {
		if (owner < 0 || owner > 31) illegalArgs("illegal owner ID");
		this.data[0] = (this.data[0] & 0b1110_0000) | owner;
	}

	get name() {
		if (this.free) return "";
		let terminator = this.data.indexOf(0, 1);
		assert(terminator !== 1, "illegal filename (zero len)");
		if (terminator < 0 || terminator > 1 + 31) terminator = 1 + 31;
		return new TextDecoder().decode(this.data.subarray(1, terminator));
	}

	set name(name: string) {
		if (name.length < 1 || name.length > 31)
			illegalArgs("invalid file name");
		this.data.fill(0, 1, 1 + 31);
		new TextEncoder().encodeInto(name, this.data.subarray(1, 1 + 31));
	}

	get start() {
		return decodeBytes(this.data, 32, 4);
	}

	set start(block: number) {
		encodeBytes(this.data, block, 32, 4);
	}

	get end() {
		return decodeBytes(this.data, 36, 4);
	}

	set end(block: number) {
		encodeBytes(this.data, block, 36, 4);
	}

	get size() {
		return decodeBytes(this.data, 40, 4);
	}

	set size(size: number) {
		encodeBytes(this.data, size, 40, 4);
	}

	get ctime() {
		return decodeBytes(this.data, 44, 4);
	}

	set ctime(epoch: number) {
		encodeBytes(this.data, epoch, 44, 4);
	}

	get mtime() {
		return decodeBytes(this.data, 48, 4);
	}

	set mtime(epoch: number) {
		encodeBytes(this.data, epoch, 48, 4);
	}

	set(spec: DirEntrySpec) {
		this.type = spec.type;
		this.name = spec.name;
		this.locked = spec.locked ?? false;
		this.owner = spec.owner;
		this.size = spec.size ?? 0;
		this.start = spec.start;
		this.end = spec.end ?? spec.start;
		this.ctime = spec.ctime ?? Date.now();
		this.mtime = spec.mtime ?? Date.now();
	}

	release() {
		this.data.fill(0);
		this.free = true;
	}

	async save() {
		this.parent.fs.storage.saveBlock(this.blockID);
	}
}

const encodeBytes = (
	bytes: Uint8Array,
	value: number,
	offset: number,
	size: number
) => {
	for (; size-- > 0; ) {
		bytes[offset++] = value & 0xff;
		value >>>= 8;
	}
};

const decodeBytes = (bytes: Uint8Array, offset: number, size: number) => {
	let value = 0;
	for (; size-- > 0; ) {
		value = (value << 8) | bytes[offset + size];
	}
	return value;
};
