// SPDX-License-Identifier: Apache-2.0
import type { ILogger } from "@thi.ng/logger";
import { rmSync, unlinkSync } from "node:fs";
import { unlink } from "node:fs/promises";
import { maskedPath } from "./mask.js";

/**
 * Deletes file at given path. If `dryRun` is true (default: false), the file
 * WON'T be deleted, however if a `logger` is provided then at least a dry-run
 * log message will be emitted.
 *
 * @param path
 * @param logger
 * @param dryRun
 */
export const deleteFile = (path: string, logger?: ILogger, dryRun = false) => {
	logger?.info(
		`${dryRun ? "[dryrun] " : ""}deleting file:`,
		maskedPath(path)
	);
	if (dryRun) return;
	unlinkSync(path);
};

export const deleteFileAsync = async (
	path: string,
	logger?: ILogger,
	dryRun = false
) => {
	logger?.info(
		`${dryRun ? "[dryrun] " : ""}deleting file:`,
		maskedPath(path)
	);
	if (dryRun) return;
	return unlink(path);
};

/**
 * Deletes multiple files via {@link deleteFile}. Any errors are caught and
 * logged, but ignored otherwise. If `dryRun` is true, files WON'T be deleted.
 *
 * @param paths
 * @param logger
 * @param dryRun
 */
export const deleteFiles = (
	paths: Iterable<string>,
	logger?: ILogger,
	dryRun = false
) => {
	for (let path of paths) {
		try {
			deleteFile(path, logger, dryRun);
		} catch (e) {
			logger?.warn(
				"error deleting file:",
				maskedPath((<Error>e).message)
			);
		}
	}
};

export const deleteFilesAsync = async (
	paths: Iterable<string>,
	logger?: ILogger,
	dryRun = false
) => {
	const promises: Promise<void>[] = [];
	for (let path of paths) {
		promises.push(deleteFileAsync(path, logger, dryRun));
	}
	await Promise.allSettled(promises);
};

/**
 * Like {@link deleteFile}, but attempts to recursively remove an entire
 * directory at given path.
 *
 * @param path
 * @param logger
 * @param dryRun
 */
export const deleteDir = (path: string, logger?: ILogger, dryRun = false) => {
	logger?.info(
		`${dryRun ? "[dryrun] " : ""}deleting directory:`,
		maskedPath(path)
	);
	if (dryRun) return;
	rmSync(path, { recursive: true, force: true });
};
