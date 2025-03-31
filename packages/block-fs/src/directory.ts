import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { EntryType, type EntrySpec } from "./api.js";
import { Entry } from "./entry.js";
import type { BlockFS } from "./fs.js";
import { encodeBytes } from "./utils.js";

export class Directory {
	constructor(
		public fs: BlockFS,
		public blockID: number,
		public parent?: Entry
	) {}

	async *[Symbol.asyncIterator]() {
		const { entries } = await this.traverse();
		for (let e of entries) {
			if (!e.free) yield e;
		}
	}

	async traverse() {
		const blocks: number[] = [];
		const entries: Entry[] = [];
		let blockID = this.blockID;
		while (true) {
			blocks.push(blockID);
			const block = await this.fs.storage.loadBlock(blockID);
			let { next, size } = this.fs.getBlockMeta(block);
			if (!next) next = this.fs.sentinelID;
			for (let i = 0; i < size; i++) {
				entries.push(
					new Entry(
						this,
						blockID,
						block,
						this.fs.dirDataOffset + i * Entry.SIZE
					)
				);
			}
			if (next === this.fs.sentinelID) break;
			blockID = next;
		}
		return { blocks, entries };
	}

	async findName(name: string) {
		for await (let e of this) {
			if (!e.free && e.name === name) return e;
		}
	}

	async mkdir(name: string) {
		const traversed = await this.traverse();
		this.ensureUniqueName(name, traversed.entries);
		const block = (await this.fs.allocateBlocks(1))[0];
		const data = await this.fs.storage.loadBlock(block);
		this.fs.setBlockMeta(data, this.fs.sentinelID, 0);
		this.fs.setBlockLink(data, this.blockID, this.fs.dataStartBlockID);
		await this.fs.storage.saveBlock(block, data);
		return this.addEntry(
			{
				name,
				type: EntryType.DIR,
				owner: this.parent?.owner ?? 0,
				start: block,
			},
			traversed
		);
	}

	async addEntry(
		spec: EntrySpec,
		state?: { blocks: number[]; entries: Entry[] }
	) {
		const { blocks, entries } = state ? state : await this.traverse();
		this.ensureUniqueName(spec.name, entries);
		let entry = entries.find((e) => e.free);
		if (entry) {
			entry.free = false;
			entry.set(spec);
			await entry.save();
			return entry;
		}
		const lastBlockID = blocks[blocks.length - 1];
		const lastBlock = await this.fs.storage.loadBlock(lastBlockID);
		let { next, size } = this.fs.getBlockMeta(lastBlock);
		if (!next) {
			next = this.fs.sentinelID;
			this.fs.setBlockMeta(lastBlock, next, 0);
		}
		const maxEntriesPerBlock =
			((this.fs.storage.blockSize - this.fs.dirDataOffset) / Entry.SIZE) |
			0;
		if (size < maxEntriesPerBlock) {
			this.fs.setBlockDataLength(lastBlock, size + 1);
			entry = new Entry(
				this,
				lastBlockID,
				lastBlock,
				this.fs.dirDataOffset + size * Entry.SIZE
			);
		} else {
			const newBlockID = (await this.fs.allocateBlocks(Entry.SIZE))[0];
			const newBlock = await this.fs.storage.loadBlock(newBlockID);
			encodeBytes(lastBlock, newBlockID, 0, this.fs.blockIDBytes);
			await this.fs.storage.saveBlock(lastBlockID, lastBlock);
			this.fs.setBlockMeta(newBlock, this.fs.sentinelID, 1);
			entry = new Entry(
				this,
				newBlockID,
				newBlock,
				this.fs.dirDataOffset
			);
		}
		entry.set(spec);
		await entry.save();
		return entry;
	}

	protected ensureUniqueName(name: string, entries: Entry[]) {
		if (entries.some((e) => !e.free && e.name === name))
			illegalArgs(`entry already exists: ${name}`);
	}
}
