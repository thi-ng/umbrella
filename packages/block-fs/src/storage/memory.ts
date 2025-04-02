// SPDX-License-Identifier: Apache-2.0
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { BlockStorageOpts, IBlock } from "../api.js";
import { ABlockStorage } from "./astorage.js";

export class MemoryBlock implements IBlock {
	constructor(
		public readonly storage: MemoryBlockStorage,
		public readonly id: number
	) {}

	async load() {
		const { storage } = this;
		storage.logger.debug("load block", this.id);
		const size = storage.blockSize;
		return storage.buffer.subarray(this.id * size, (this.id + 1) * size);
	}

	async save(data: Uint8Array) {
		const { storage } = this;
		if (data.length !== storage.blockSize) illegalArgs(`wrong block size`);
		storage.logger.debug("save block", this.id);
		storage.buffer.set(data, this.id * storage.blockSize);
	}

	async delete() {
		const size = this.storage.blockSize;
		this.storage.buffer.fill(0, this.id * size, (this.id + 1) * size);
	}
}

/**
 * Configuration options for {@link MemoryBlockStorage}.
 */
export interface MemoryBlockStorageOpts extends BlockStorageOpts {
	/**
	 * Optional, pre-defined/loaded byte buffer. Must have at least `numBlocks *
	 * blockSize` capacity.
	 */
	buffer?: Uint8Array;
}

export class MemoryBlockStorage extends ABlockStorage<MemoryBlock> {
	buffer: Uint8Array;

	constructor(opts: MemoryBlockStorageOpts) {
		super(opts);
		const size = this.numBlocks * this.blockSize;
		if (opts.buffer && opts.buffer.length < size) {
			illegalArgs(
				`given buffer is too small, expected at least ${size} bytes`
			);
		}
		this.buffer = opts.buffer ?? new Uint8Array(size);
	}

	async hasBlock(id: number) {
		this.ensureValidID(id);
		return true;
	}

	ensureBlock(id: number) {
		this.ensureValidID(id);
		return this.blocks[id] ?? (this.blocks[id] = new MemoryBlock(this, id));
	}
}
