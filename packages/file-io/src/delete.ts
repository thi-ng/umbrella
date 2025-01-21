// SPDX-License-Identifier: Apache-2.0
import type { ILogger } from "@thi.ng/logger";
import { rmSync, unlinkSync } from "node:fs";

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
	logger?.info(`${dryRun ? "[dryrun] " : ""}deleting file: ${path}`);
	if (dryRun) return;
	unlinkSync(path);
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
	logger?.info(`${dryRun ? "[dryrun] " : ""}deleting file: ${path}`);
	if (dryRun) return;
	rmSync(path, { recursive: true, force: true });
};
