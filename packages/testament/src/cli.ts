import { readdirSync, statSync } from "fs";
import { resolve } from "path";
import { isString } from "./utils";

// interface TestamentArgs {
//     csv: boolean;
// }

(async () => {
    const dirs = process.argv.slice(2);

    // const cwd = process.argv[1];

    for (let dir of dirs) {
        for (let src of files(resolve(dir), ".ts")) {
            try {
                await import(src);
            } catch (e) {
                console.log(`error executing ${src}:`, (<Error>e).message);
            }
        }
    }
})();

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
