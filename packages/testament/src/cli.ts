import { readdirSync, statSync } from "fs";
import { resolve } from "path";
import { LOGGER } from "./logger";
import { executeTasks } from "./task";
import { isString } from "./utils";

// interface TestamentArgs {
//     csv: boolean;
// }

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

(async () => {
    const dirs = process.argv.slice(2);

    // const cwd = process.argv[1];

    const imports: Promise<any>[] = [];
    for (let dir of dirs) {
        dir = resolve(dir);
        if (statSync(dir).isDirectory()) {
            for (let src of files(dir, ".ts")) {
                imports.push(import(src));
            }
        } else {
            imports.push(import(dir));
        }
    }
    LOGGER.info(`importing ${imports.length} tests...`);
    await Promise.all(imports);
    await executeTasks();
})();
