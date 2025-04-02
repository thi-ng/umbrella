// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { Pow2 } from "@thi.ng/binary";
import type { ILogger } from "@thi.ng/logger";
import type { BlockFS } from "./fs.js";

export interface IBlock {
	load(): Promise<Uint8Array>;

	save(data: Uint8Array): Promise<void>;

	delete(): Promise<void>;
}

export interface IBlockStorage {
	readonly logger: ILogger;
	readonly blockSize: Pow2;
	readonly numBlocks: number;

	hasBlock(id: number): Promise<boolean>;

	loadBlock(id: number): Promise<Uint8Array>;

	saveBlock(id: number, data: Uint8Array): Promise<void>;

	deleteBlock(id: number): Promise<void>;
}

export interface BlockStorageOpts {
	logger?: ILogger;
	/**
	 * Max. number of blocks. Will be rounded up to a multiple of 8.
	 */
	numBlocks: number;
	/**
	 * Block size in bytes. Must be a power of 2. For usage with
	 * {@link BlockFS}, requires a minimum size of 128 bytes (though in practice
	 * should be larger to minimize overhead per block).
	 */
	blockSize: Pow2;
}

export interface EntrySpec {
	/** Entry type (file or directory) */
	type: EntryType;
	/** TODO currently still unused */
	locked?: boolean;
	/** Owner ID */
	owner?: number;
	/** Entry name */
	name: string;
	/** Only used for files. File size as bigint */
	size?: bigint;
	/** Entry creation timestamp */
	ctime?: number;
	/** Entry modification timestamp */
	mtime?: number;
	/** Data start block ID */
	start: number;
	/** Data end block ID */
	end?: number;
}

export enum EntryType {
	FILE,
	DIR,
}

export interface IEntry extends Required<EntrySpec> {
	free: boolean;

	readonly parent: IDirectory | null;
	readonly path: string;
	readonly directory: IDirectory;

	set(spec: EntrySpec): void;

	release(): void;

	save(): Promise<void>;

	isDirectory(): boolean;
}

export interface IDirectory extends AsyncIterable<IEntry> {
	readonly fs: BlockFS;
	readonly entry: IEntry;

	tree(): AsyncIterableIterator<IEntry>;

	traverse(): Promise<{ blocks: number[]; entries: IEntry[] }>;

	findName(name: string): Promise<Maybe<IEntry>>;

	mkdir(name: string): Promise<IEntry>;

	addEntry(
		spec: EntrySpec,
		state?: { blocks: number[]; entries: IEntry[] }
	): Promise<IEntry>;
}
