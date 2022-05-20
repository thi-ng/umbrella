import type { TypedArray } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import type { ILogger } from "@thi.ng/logger";
import { WriteFileOptions, writeFileSync } from "fs";
import { ensureDirForFile } from "./dir.js";
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
) => {
    logger && logger.info(`${dryRun ? "[dryrun] " : ""}writing file: ${path}`);
    if (dryRun) return;
    ensureDirForFile(path);
    writeFileSync(path, body, !opts && isString(body) ? "utf-8" : opts);
};
