// SPDX-License-Identifier: Apache-2.0
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { deleteFile, readBinary, writeFile } from "@thi.ng/file-io";
import { padLeft } from "@thi.ng/strings";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import type { BlockStorageOpts, IBlock } from "../api.js";
import { ABlockStorage } from "./astorage.js";

const Z8 = padLeft(8, "0");

export class FileBlock implements IBlock {
	constructor(public storage: FileBlockStorage, public id: number) {}

	async load() {
		const { storage } = this;
		const path = storage.getPath(this.id);
		return existsSync(path)
			? readBinary(path, storage.logger)
			: new Uint8Array(storage.blockSize);
	}

	async save(data: Uint8Array) {
		const { storage } = this;
		if (data.length !== storage.blockSize)
			illegalArgs(`wrong block size: ${data.length}`);
		writeFile(storage.getPath(this.id), data, null, storage.logger);
	}

	async delete() {
		deleteFile(this.storage.getPath(this.id), this.storage.logger);
	}
}

/**
 * Configuration options for {@link FileBlockStorage}.
 */
export interface FileBlockStorageOpts extends BlockStorageOpts {
	/**
	 * Path to host filesystem base directory used for storing blocks.
	 */
	baseDir: string;
}

export class FileBlockStorage extends ABlockStorage<FileBlock> {
	baseDir: string;

	constructor(opts: FileBlockStorageOpts) {
		super(opts);
		this.baseDir = opts.baseDir;
	}

	async hasBlock(id: number) {
		this.ensureValidID(id);
		return !!this.blocks[id] || existsSync(this.getPath(id));
	}

	ensureBlock(id: number) {
		this.ensureValidID(id);
		return this.blocks[id] ?? (this.blocks[id] = new FileBlock(this, id));
	}

	getPath(id: number) {
		return resolve(join(this.baseDir, Z8(id)));
	}
}
