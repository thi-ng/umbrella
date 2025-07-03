// SPDX-License-Identifier: Apache-2.0
import type { ILogger } from "@thi.ng/logger";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { maskedPath } from "./mask.js";

/**
 * Reads given file `path` into a byte array.
 *
 * @param path
 * @param logger
 */
export const readBinary = (path: string, logger?: ILogger) => {
	logger?.debug("reading file:", maskedPath(path));
	const buf = readFileSync(path);
	return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
};

/**
 * Async version of {@link readBinary}.
 *
 * @param path
 * @param logger
 */
export const readBinaryAsync = async (path: string, logger?: ILogger) => {
	logger?.debug("reading file:", maskedPath(path));
	const buf = await readFile(path);
	return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
};
