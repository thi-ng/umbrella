import { isString } from "@thi.ng/checks/is-string";
import type { ILogger } from "@thi.ng/logger";
import { readdirSync, statSync } from "fs";
import { sep } from "path";
import { isDirectory } from "./dir.js";

/**
 * Recursively reads given directory (up to given max. depth, default: infinite)
 * and yields sequence of file names matching given extension (or regexp).
 *
 * @remarks
 * If NO `match` is given, all files will be matched. Directory names will not
 * be tested and are always traversed (up to given `maxDepth`).
 *
 * The optional `logger` is only used to log errors for files which couldn't be
 * accessed.
 *
 * @param dir
 * @param match
 * @param maxDepth
 * @param logger
 */
export const files = (
    dir: string,
    match: string | RegExp = "",
    maxDepth = Infinity,
    logger?: ILogger
) => __files(dir, match, logger, maxDepth, 0);

function* __files(
    dir: string,
    match: string | RegExp = "",
    logger?: ILogger,
    maxDepth = Infinity,
    depth = 0
): IterableIterator<string> {
    if (depth >= maxDepth) return;
    const re = __ensureRegEx(match);
    for (let f of readdirSync(dir)) {
        const curr = dir + sep + f;
        try {
            if (isDirectory(curr)) {
                yield* __files(curr, match, logger, maxDepth, depth + 1);
            } else if (re.test(f)) {
                yield curr;
            }
        } catch (e) {
            logger &&
                logger.warn(`ignoring file: ${f} (${(<Error>e).message})`);
        }
    }
}

/**
 * Similar to {@link files}, however yields iterator of only matching
 * sub-directories in given `dir`. Normal files are being ignored.
 *
 * @remarks
 * Unlike the regex matching in {@link files}, here the regex will be applied to
 * the _full_ sub-path (starting with `dir`) in order to determine a match.
 *
 * @param dir
 * @param match
 * @param maxDepth
 * @param logger
 */
export const dirs = (
    dir: string,
    match: string | RegExp = "",
    maxDepth = Infinity,
    logger?: ILogger
) => __dirs(dir, match, logger, maxDepth, 0);

function* __dirs(
    dir: string,
    match: string | RegExp = "",
    logger?: ILogger,
    maxDepth = Infinity,
    depth = 0
): IterableIterator<string> {
    if (depth >= maxDepth) return;
    const re = __ensureRegEx(match);
    for (let f of readdirSync(dir)) {
        const curr = dir + sep + f;
        try {
            if (statSync(curr).isDirectory()) {
                if (re.test(curr)) yield curr;
                yield* __dirs(curr, match, logger, maxDepth, depth + 1);
            }
        } catch (e) {
            logger &&
                logger.warn(`ignoring file/dir: ${f} (${(<Error>e).message})`);
        }
    }
}

/** @internal */
const __ensureRegEx = (match: string | RegExp) =>
    isString(match) ? new RegExp(`${match.replace(/\./g, "\\.")}$`) : match;
