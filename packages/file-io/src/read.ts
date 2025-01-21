// SPDX-License-Identifier: Apache-2.0
import type { ILogger } from "@thi.ng/logger";
import { readFileSync } from "node:fs";

/**
 * Reads given file `path` into a byte array.
 *
 * @param path
 * @param logger
 */
export const readBinary = (path: string, logger?: ILogger) => {
	logger?.debug("reading file:", path);
	const buf = readFileSync(path);
	return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
};
