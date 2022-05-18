import { isArray } from "@thi.ng/checks/is-array";
import type { ILogger } from "@thi.ng/logger";
import { readFileSync, writeFileSync } from "fs";
import { ensureDirForFile } from "./ensure-dir.js";

export const readText = (path: string, logger?: ILogger) => {
    logger && logger.debug("reading file:", path);
    return readFileSync(path, "utf-8");
};

export const writeText = (
    path: string,
    body: string | string[],
    logger?: ILogger
) => {
    logger && logger.debug("writing file:", path);
    ensureDirForFile(path);
    writeFileSync(path, isArray(body) ? body.join("\n") : body, "utf-8");
};
