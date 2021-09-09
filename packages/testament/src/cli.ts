import { readdirSync, statSync, writeFileSync } from "fs";
import { resolve } from "path";
import { GLOBAL_OPTS, TestResult } from "./api";
import { execute } from "./exec";
import { isString } from "./utils";

interface TestamentArgs {
    csv: boolean;
    json: boolean;
    out?: string;
    rest: string[];
}

const parseOpts = (args: string[], i = 2) => {
    const res = <TestamentArgs>{
        csv: false,
        json: false,
    };
    outer: for (; i < args.length; ) {
        switch (args[i]) {
            case "-a":
            case "--all":
                GLOBAL_OPTS.stop = false;
                i++;
                break;
            case "--csv":
                res.csv = true;
                i++;
                break;
            case "--json":
                res.json = true;
                i++;
                break;
            case "-o":
                res.out = args[i + 1];
                i += 2;
                break;
            case "-t":
            case "--timeout":
                const val = parseInt(args[i + 1]);
                if (!isNaN(val)) {
                    GLOBAL_OPTS.timeOut = val;
                } else {
                    console.log("ignoring invalid timeout value", args[i + 1]);
                }
                i += 2;
                break;
            case "-h":
            case "--help":
                console.log(`
Usage: testament [opts] path1 [path2...]

Options:
--all, -a        Run all tests (don't stop at 1st failure)
--csv            Export results as CSV
--json           Export results as JSON
-o               Output file path for exported results
--timeout, -t    Set default timeout value (milliseconds)

--help, -h       Print this help and quit
`);
                return;
            default:
                break outer;
        }
    }
    if (res.out && res.csv && res.json) {
        console.warn(
            "only CSV *or* JSON file output is supported, not both at the same time, exiting..."
        );
        return;
    }
    res.rest = args.slice(i);
    return res;
};

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

const output = (body: string, path?: string) => {
    if (path) {
        GLOBAL_OPTS.logger.info("writing results to:", path);
        try {
            writeFileSync(path, body, "utf-8");
        } catch (e) {
            GLOBAL_OPTS.logger.warn((<Error>e).message);
        }
    } else {
        console.log(body);
    }
};

const formatCSV = (results: TestResult[]) =>
    [
        "Status,Group,Test,Time,Trials,Error",
        ...results.map((r) =>
            [
                r.error ? "fail" : "ok",
                r.group || "",
                r.title,
                r.time,
                r.trials,
                r.error ? r.error.message : "",
            ].join(",")
        ),
    ].join("\n");

const formatJSON = (results: TestResult[]) =>
    JSON.stringify(
        results.map((r) => ({
            status: r.error ? "fail" : "ok",
            group: r.group,
            title: r.title,
            time: r.time,
            trials: r.trials,
            error: r.error ? r.error.message : undefined,
        })),
        null,
        4
    );

(async () => {
    const opts = parseOpts(process.argv);
    if (!opts) return;

    const imports: Promise<any>[] = [];
    for (let src of opts.rest) {
        src = resolve(src);
        if (statSync(src).isDirectory()) {
            for (let f of files(src, /\.[jt]s$/)) {
                imports.push(import(f));
            }
        } else {
            imports.push(import(src));
        }
    }

    GLOBAL_OPTS.logger.info(`importing ${imports.length} sources...`);
    GLOBAL_OPTS.exit = true;

    await Promise.all(imports);
    const results = await execute();

    opts.csv && output(formatCSV(results), opts.out);
    opts.json && output(formatJSON(results), opts.out);
})();
