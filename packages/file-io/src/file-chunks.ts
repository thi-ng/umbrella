import type { Nullable } from "@thi.ng/api";
import { U32 } from "@thi.ng/hex";
import type { ILogger } from "@thi.ng/logger";
import { open, type FileHandle } from "node:fs/promises";

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
 * for await(let buf of fileChunks("file.bin", { start: 16*1024*1024 })) {
 *   // ...
 * }
 * ```
 *
 * @param path
 * @param opts
 */
export async function* fileChunks(path: string, opts?: Partial<FileChunkOpts>) {
	let { logger, size, start, end } = {
		size: 1024,
		start: 0,
		end: Infinity,
		...opts,
	};
	logger &&
		logger.debug(`start reading file chunks (size: 0x${size}): ${path}`);
	let fd: Nullable<FileHandle> = undefined;
	try {
		fd = await open(path, "r");
		while (start < end) {
			logger &&
				logger.debug(
					`reading chunk: 0x${U32(start)} - 0x${U32(
						start + size - 1
					)} (${path})`
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
