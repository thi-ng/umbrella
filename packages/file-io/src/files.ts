import { isString } from "@thi.ng/checks/is-string";
import type { ILogger } from "@thi.ng/logger";
import { readdirSync, statSync } from "fs";
import { sep } from "path";

/**
 * Recursively reads given directory (up to given max. depth, default: infinite)
 * and yields sequence of file names matching given extension (or regexp).
 *
 * @param dir
 * @param match
 * @param maxDepth
 * @param logger
 */
export const files = (
    dir: string,
    match: string | RegExp,
    maxDepth = Infinity,
    logger?: ILogger
) => __files(dir, match, logger, maxDepth, 0);

function* __files(
    dir: string,
    match: string | RegExp,
    logger?: ILogger,
    maxDepth = Infinity,
    depth = 0
): IterableIterator<string> {
    if (depth >= maxDepth) return;
    const re = isString(match)
        ? new RegExp(`${match.replace(/\./g, "\\.")}$`)
        : match;
    for (let f of readdirSync(dir)) {
        const curr = dir + sep + f;
        try {
            if (re.test(f)) {
                yield curr;
            } else if (statSync(curr).isDirectory()) {
                yield* __files(curr, match, logger, maxDepth, depth + 1);
            }
        } catch (e) {
            logger &&
                logger.warn(`ignoring file: ${f} (${(<Error>e).message})`);
        }
    }
}
