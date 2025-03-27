// SPDX-License-Identifier: Apache-2.0
import type { Pow2 } from "@thi.ng/binary";
import type { ILogger } from "@thi.ng/logger";

export interface IBlock {
	load(): Promise<Uint8Array>;

	save(): Promise<void>;

	delete(): Promise<void>;
}

export interface IBlockStorage {
	readonly logger: ILogger;
	readonly blockSize: Pow2;
	readonly numBlocks: number;

	hasBlock(id: number): Promise<boolean>;

	loadBlock(id: number): Promise<Uint8Array>;

	saveBlock(id: number): Promise<void>;

	deleteBlock(id: number): Promise<void>;
}

export interface BlockStorageOpts {
	logger: ILogger;
	numBlocks: number;
	blockSize: Pow2;
}
