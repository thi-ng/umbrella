import type { ILogger } from "@thi.ng/logger";
import { unlinkSync } from "fs";

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
	logger && logger.info(`${dryRun ? "[dryrun] " : ""}deleting file: ${path}`);
	if (dryRun) return;
	unlinkSync(path);
};
