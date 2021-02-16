import { readdirSync, readFileSync, statSync } from "fs";

export const readJSON = (path: string) => JSON.parse(<any>readFileSync(path));

export const readText = (path: string) => readFileSync(path).toString();

/**
 * Recursively reads given directory and returns file names matching
 * given extension.
 *
 * @param dir
 * @param ext
 * @param maxDepth
 * @param depth
 */
export function* files(
    dir: string,
    ext: string,
    maxDepth = Infinity,
    depth = 0
): IterableIterator<string> {
    if (depth >= maxDepth) return;
    for (let f of readdirSync(dir)) {
        const curr = dir + "/" + f;
        if (f.endsWith(ext)) {
            yield curr;
        } else if (statSync(curr).isDirectory()) {
            yield* files(curr, ext, maxDepth, depth + 1);
        }
    }
}
