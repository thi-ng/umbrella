import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { utf8Length } from "@thi.ng/strings/utf8";
import {
	EntryType,
	type EntrySpec,
	type IDirectory,
	type IEntry,
} from "./api.js";
import { Entry } from "./entry.js";
import type { BlockFS } from "./fs.js";

export class Directory implements IDirectory {
	constructor(public fs: BlockFS, public entry: IEntry) {}

	async *[Symbol.asyncIterator](): AsyncIterableIterator<IEntry> {
		const fs = this.fs;
		let blockID = this.entry.start;
		while (true) {
			const block = await fs.storage.loadBlock(blockID);
			let { next, size } = fs.getBlockMeta(block);
			if (!next) next = fs.sentinelID;
			for (let i = 0; i < size; i++) {
				const entry = this.defEntry(i, blockID, block);
				if (!entry.free) yield entry;
			}
			if (next === fs.sentinelID) break;
			blockID = next;
		}
	}

	async *tree(): AsyncIterableIterator<IEntry> {
		for await (let entry of this) {
			yield entry;
			if (entry.type === EntryType.DIR) yield* entry.directory.tree();
		}
	}

	async traverse() {
		const blocks: number[] = [];
		const entries: IEntry[] = [];
		let blockID = this.entry.start;
		while (true) {
			blocks.push(blockID);
			const block = await this.fs.storage.loadBlock(blockID);
			let { next, size } = this.fs.getBlockMeta(block);
			if (!next) next = this.fs.sentinelID;
			for (let i = 0; i < size; i++) {
				entries.push(this.defEntry(i, blockID, block));
			}
			if (next === this.fs.sentinelID) break;
			blockID = next;
		}
		return { blocks, entries };
	}

	async findName(name: string) {
		for await (let e of this) {
			if (e.name === name) return e;
		}
	}

	async mkdir(name: string) {
		const length = utf8Length(name);
		if (!length || length > Entry.NAME_MAX_LENGTH)
			illegalArgs(`invalid name: '${name}'`);
		const traversed = await this.traverse();
		this.ensureUniqueName(name, traversed.entries);
		const block = (await this.fs.allocateBlocks(1))[0];
		const data = await this.fs.storage.loadBlock(block);
		this.fs.setBlockMeta(data, this.fs.sentinelID, 0);
		this.fs.setBlockLink(data, this.entry.start, this.fs.dataStartBlockID);
		await this.fs.storage.saveBlock(block, data);
		return this.addEntry(
			{
				name,
				type: EntryType.DIR,
				owner: this.entry.parent?.entry.owner ?? 0,
				start: block,
			},
			traversed
		);
	}

	async addEntry(
		spec: EntrySpec,
		state?: { blocks: number[]; entries: IEntry[] }
	): Promise<IEntry> {
		const { blocks, entries } = state ? state : await this.traverse();
		this.ensureUniqueName(spec.name, entries);
		let entry = entries.find((e) => e.free);
		if (entry) {
			entry.free = false;
			entry.set(spec);
			await entry.save();
			return entry;
		}
		const fs = this.fs;
		const lastBlockID = blocks[blocks.length - 1];
		const lastBlock = await fs.storage.loadBlock(lastBlockID);
		let { next, size } = fs.getBlockMeta(lastBlock);
		if (!next) {
			next = fs.sentinelID;
			fs.setBlockMeta(lastBlock, next, 0);
		}
		const maxEntriesPerBlock =
			((fs.storage.blockSize - fs.dirDataOffset) / fs.opts.entry.size) |
			0;
		if (size < maxEntriesPerBlock) {
			fs.setBlockDataLength(lastBlock, size + 1);
			entry = this.defEntry(size, lastBlockID, lastBlock);
		} else {
			const newBlockID = (await fs.allocateBlocks(1))[0];
			const newBlock = await fs.storage.loadBlock(newBlockID);
			fs.setBlockLink(lastBlock, newBlockID);
			await fs.storage.saveBlock(lastBlockID, lastBlock);
			fs.setBlockMeta(newBlock, fs.sentinelID, 1);
			entry = this.defEntry(0, newBlockID, newBlock);
		}
		entry.set(spec);
		await entry.save();
		return entry;
	}

	protected ensureUniqueName(name: string, entries: IEntry[]) {
		if (entries.some((e) => !e.free && e.name === name))
			illegalArgs(`entry already exists: '${name}'`);
	}

	protected defEntry(i: number, blockID: number, block: Uint8Array) {
		const fs = this.fs;
		const { factory, size } = fs.opts.entry;
		return factory(fs, this, blockID, block, fs.dirDataOffset + i * size);
	}
}
