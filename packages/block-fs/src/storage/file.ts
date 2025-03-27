// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import { deleteFile, readBinary, writeFile } from "@thi.ng/file-io";
import { padLeft } from "@thi.ng/strings";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import type { BlockStorageOpts, IBlock } from "../api.js";
import { ABlockStorage } from "./astorage.js";

const Z8 = padLeft(8, "0");

export class FileBlock implements IBlock {
	buffer: Maybe<Uint8Array>;

	constructor(public storage: FileBlockStorage, public id: number) {}

	async load() {
		if (this.buffer) return this.buffer;
		const path = this.storage.getPath(this.id);
		this.buffer = existsSync(path)
			? readBinary(path, this.storage.logger)
			: new Uint8Array(this.storage.blockSize);
		return this.buffer;
	}

	async save() {
		assert(!!this.buffer, `block not yet initialized`);
		writeFile(
			this.storage.getPath(this.id),
			this.buffer!,
			null,
			this.storage.logger
		);
	}

	async delete() {
		this.buffer = undefined;
		deleteFile(this.storage.getPath(this.id), this.storage.logger);
	}
}

export interface FileBlockStorageOpts extends BlockStorageOpts {
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

	loadBlock(id: number) {
		this.ensureValidID(id);
		return (
			this.blocks[id] ?? (this.blocks[id] = new FileBlock(this, id))
		).load();
	}

	getPath(id: number) {
		return resolve(join(this.baseDir, Z8(id)));
	}
}
