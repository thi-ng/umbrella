// SPDX-License-Identifier: Apache-2.0
import type { ILogger } from "@thi.ng/logger";
import { NULL_LOGGER } from "@thi.ng/logger/null";
import type { BlockStorageOpts, IBlock, IBlockStorage } from "../api.js";
import type { Pow2 } from "@thi.ng/binary";
import type { Maybe } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";

export abstract class ABlockStorage<T extends IBlock> implements IBlockStorage {
	protected blocks: Maybe<T>[] = [];
	logger: ILogger;
	blockSize: Pow2;
	numBlocks: number;

	constructor(opts: BlockStorageOpts) {
		this.logger = opts.logger ?? NULL_LOGGER;
		this.blockSize = opts.blockSize;
		this.numBlocks = opts.numBlocks;
	}

	abstract hasBlock(id: number): Promise<boolean>;

	abstract ensureBlock(id: number): T;

	loadBlock(id: number) {
		return this.ensureBlock(id).load();
	}

	saveBlock(id: number, data: Uint8Array) {
		return this.ensureBlock(id).save(data);
	}

	deleteBlock(id: number) {
		const block = this.blocks[id];
		assert(!!block, `block not yet initialized`);
		this.blocks[id] = undefined;
		return block!.delete();
	}

	protected ensureValidID(id: number) {
		assert(id >= 0 && id < this.numBlocks, `invalid block ID: ${id}`);
	}
}
