// SPDX-License-Identifier: Apache-2.0
import { isArray } from "@thi.ng/checks/is-array";
import type { ILogger } from "@thi.ng/logger";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { maskedPath } from "./mask.js";
import { writeFile, writeFileAsync } from "./write.js";

/**
 * Reads text from given file `path`, optionally with custom encoding (default:
 * UTF-8).
 *
 * @param path
 * @param logger
 * @param encoding
 */
export const readText = (
	path: string,
	logger?: ILogger,
	encoding: Extract<
		BufferEncoding,
		"ascii" | "latin1" | "utf-8" | "utf-16le" | "ucs-2"
	> = "utf-8"
) => {
	logger?.debug("reading file:", maskedPath(path));
	return readFileSync(path, encoding);
};

/**
 * Async version of {@link readText}.
 *
 * @param path
 * @param logger
 * @param encoding
 */
export const readTextAsync = (
	path: string,
	logger?: ILogger,
	encoding: Extract<
		BufferEncoding,
		"ascii" | "latin1" | "utf-8" | "utf-16le" | "ucs-2"
	> = "utf-8"
) => {
	logger?.debug("reading file:", maskedPath(path));
	return readFile(path, encoding);
};

/**
 * Writes `body` as UTF-8 file to given `path`. If `dryRun` is true (default:
 * false), the file WON'T be written, however if a `logger` is provided then at
 * least a dry-run log message will be emitted.
 *
 * @param path
 * @param body
 * @param logger
 * @param dryRun
 */
export const writeText = (
	path: string,
	body: string | string[],
	logger?: ILogger,
	dryRun = false
) =>
	writeFile(
		path,
		isArray(body) ? body.join("\n") : body,
		"utf-8",
		logger,
		dryRun
	);

/**
 * Async version of {@link writeText}.
 *
 * @param path
 * @param body
 * @param logger
 * @param dryRun
 */
export const writeTextAsync = (
	path: string,
	body: string | string[],
	logger?: ILogger,
	dryRun = false
) =>
	writeFileAsync(
		path,
		isArray(body) ? body.join("\n") : body,
		"utf-8",
		logger,
		dryRun
	);
