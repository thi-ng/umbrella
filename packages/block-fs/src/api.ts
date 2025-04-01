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
	logger: ILogger;
	numBlocks: number;
	blockSize: Pow2;
}

export interface EntrySpec {
	type: EntryType;
	locked?: boolean;
	owner?: number;
	name: string;
	size?: bigint;
	ctime?: number;
	mtime?: number;
	start: number;
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
