// SPDX-License-Identifier: Apache-2.0
import type { Fn3, TypedArray } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import type { ILogger } from "@thi.ng/logger";
import { writeFileSync, type WriteFileOptions } from "node:fs";
import { writeFile as writeAsync } from "node:fs/promises";
import { ensureDirForFile } from "./dir.js";
import { maskedPath } from "./mask.js";

/**
 * Writes `body` as to given `path` (using optional `opts` to define encoding).
 * If `dryRun` is true (default: false), the file WON'T be written, however if a
 * `logger` is provided then at least a dry-run log message will be emitted.
 *
 * @param path
 * @param body
 * @param opts
 * @param logger
 * @param dryRun
 */
export const writeFile = (
	path: string,
	body: string | TypedArray,
	opts?: WriteFileOptions,
	logger?: ILogger,
	dryRun = false
): void => __write(writeFileSync, path, body, opts, logger, dryRun);

/**
 * Async version of {@link writeFile}.
 *
 * @param path
 * @param body
 * @param opts
 * @param logger
 * @param dryRun
 */
export const writeFileAsync = (
	path: string,
	body: string | TypedArray,
	opts?: WriteFileOptions,
	logger?: ILogger,
	dryRun = false
): Promise<void> => __write(writeAsync, path, body, opts, logger, dryRun);

const __write = (
	writeFn: Fn3<
		string,
		string | TypedArray,
		WriteFileOptions | undefined,
		any
	>,
	path: string,
	body: string | TypedArray,
	opts?: WriteFileOptions,
	logger?: ILogger,
	dryRun = false
) => {
	logger?.info(
		`${dryRun ? "[dryrun] " : ""}writing file: ${maskedPath(path)}`
	);
	if (dryRun) return;
	ensureDirForFile(path);
	return writeFn(path, body, !opts && isString(body) ? "utf-8" : opts);
};
