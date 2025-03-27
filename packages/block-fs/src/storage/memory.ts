// SPDX-License-Identifier: Apache-2.0
import type { BlockStorageOpts, IBlock } from "../api.js";
import { ABlockStorage } from "./astorage.js";

export class MemoryBlock implements IBlock {
	constructor(
		public readonly storage: MemoryBlockStorage,
		public readonly id: number
	) {}

	async load() {
		const size = this.storage.blockSize;
		return this.storage.buffer.subarray(
			this.id * size,
			(this.id + 1) * size
		);
	}

	async save() {}

	async delete() {}
}

export class MemoryBlockStorage extends ABlockStorage<MemoryBlock> {
	buffer: Uint8Array;

	constructor(opts: BlockStorageOpts) {
		super(opts);
		this.buffer = new Uint8Array(this.numBlocks * this.blockSize);
	}

	async hasBlock(id: number) {
		this.ensureValidID(id);
		return true;
	}

	loadBlock(id: number) {
		this.ensureValidID(id);
		return (
			this.blocks[id] ?? (this.blocks[id] = new MemoryBlock(this, id))
		).load();
	}
}
