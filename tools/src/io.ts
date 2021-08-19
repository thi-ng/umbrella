import { isString } from "@thi.ng/checks";
import { readdirSync, readFileSync, statSync } from "fs";

export const readJSON = (path: string) => JSON.parse(<any>readFileSync(path));

export const readText = (path: string) => readFileSync(path).toString();

/**
 * Recursively reads given directory and yields sequence of file names matching
 * given extension (or regexp).
 *
 * @param dir
 * @param match
 * @param maxDepth
 * @param depth
 */
export function* files(
    dir: string,
    match: string | RegExp,
    maxDepth = Infinity,
    depth = 0
): IterableIterator<string> {
    if (depth >= maxDepth) return;
    const re = isString(match)
        ? new RegExp(`${match.replace(/\./g, "\\.")}$`)
        : match;
    for (let f of readdirSync(dir)) {
        const curr = dir + "/" + f;
        if (re.test(f)) {
            yield curr;
        } else if (statSync(curr).isDirectory()) {
            yield* files(curr, match, maxDepth, depth + 1);
        }
    }
}
