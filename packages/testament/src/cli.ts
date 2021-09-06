import { flag, parse } from "@thi.ng/args";
import { isString } from "@thi.ng/checks";
import { readdirSync, statSync } from "fs";
import { resolve } from "path";

interface TestamentArgs {
    csv: boolean;
}

(async () => {
    const res = parse<TestamentArgs>(
        { csv: flag({ desc: "Output CSV" }) },
        process.argv,
        {
            start: 2,
            usageOpts: {
                prefix: `
@thi.ng/testament test runner
Usage: testament [opts] DIR1 DIR2...

Options:`,
            },
        }
    );

    if (!res) return;

    // const cwd = process.argv[1];

    for (let dir of res.rest) {
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
