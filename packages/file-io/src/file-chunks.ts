// SPDX-License-Identifier: Apache-2.0
import type { Nullable } from "@thi.ng/api";
import { U32 } from "@thi.ng/hex";
import type { ILogger } from "@thi.ng/logger";
import { open, type FileHandle } from "node:fs/promises";
import { maskedPath } from "./mask.js";

export interface FileChunkOpts {
	/**
	 * Optional logger instance
	 */
	logger: ILogger;
	/**
	 * Chunk size (in bytes).
	 *
	 * @defaultValue 1024
	 */
	size: number;
	/**
	 * Read start position (in bytes)
	 *
	 * @defaultValue 0
	 */
	start: number;
	/**
	 * Read end position (in bytes)
	 *
	 * @defaultValue Infinity
	 */
	end: number;
}

/**
 * Async iterator. Yields chunks of byte buffers from given file. User
 * configurable size and byte ranges.
 *
 * @example
 * ```ts
 * import { fileChunks } from "@thi.ng/file-io";
 *
 * for await(let buf of fileChunks("file.bin", { start: 16*1024*1024 })) {
 *   // ...
 * }
 * ```
 *
 * @param path
 * @param opts
 */
export async function* fileChunks(
	path: string,
	opts: Partial<FileChunkOpts> = {}
) {
	let { size = 1024, start = 0, end = Infinity, logger } = opts;
	const mpath = maskedPath(path);
	logger?.debug(`start reading file chunks (size: 0x${size}):`, mpath);
	let fd: Nullable<FileHandle> = undefined;
	try {
		fd = await open(path, "r");
		while (start < end) {
			logger?.debug(
				`reading chunk: 0x${U32(start)} - 0x${U32(
					start + size - 1
				)} (${mpath})`
			);
			const { buffer, bytesRead } = await fd.read({
				buffer: Buffer.alloc(size),
				length: size,
				position: start,
			});
			if (bytesRead === 0) break;
			yield buffer;
			if (bytesRead < size) break;
			start += bytesRead;
		}
	} finally {
		await fd?.close();
	}
}
