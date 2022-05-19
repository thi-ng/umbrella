import { isArray } from "@thi.ng/checks/is-array";
import type { ILogger } from "@thi.ng/logger";
import { readFileSync } from "fs";
import { writeFile } from "./write.js";

export const readText = (path: string, logger?: ILogger) => {
    logger && logger.debug("reading file:", path);
    return readFileSync(path, "utf-8");
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
