// thing:no-export
import { watch } from "chokidar";
import { readdirSync, statSync, writeFileSync } from "fs";
import { resolve } from "path";
import { GLOBAL_OPTS, TestResult } from "./api.js";
import { execute } from "./exec.js";
import { isString } from "./utils.js";

interface TestamentArgs {
	csv: boolean;
	json: boolean;
	watch: boolean;
	exclude: string[];
	out?: string;
	rest: string[];
}

const parseOpts = (args: string[], i = 2): TestamentArgs | number => {
	const res = <TestamentArgs>{
		csv: false,
		json: false,
		watch: false,
		exclude: ["test/fixtures"],
		rest: [],
	};
	for (; i < args.length; i++) {
		switch (args[i]) {
			case "-a":
			case "--all":
				GLOBAL_OPTS.stop = false;
				break;
			case "--csv":
				res.csv = true;
				break;
			case "--json":
				res.json = true;
				break;
			case "-o":
				res.out = args[i + 1];
				i++;
				break;
			case "-t":
			case "--timeout":
				const val = parseInt(args[i + 1]);
				if (!isNaN(val)) {
					GLOBAL_OPTS.timeOut = val;
				} else {
					console.warn("invalid timeout value", args[i + 1]);
					return 1;
				}
				i++;
				break;
			case "-w":
			case "--watch":
				res.watch = true;
				break;
			case "-e":
			case "--exclude":
				res.exclude.push(args[i + 1]);
				i++;
				break;
			case "-h":
			case "--help":
				console.log(`
Usage: testament [opts] path1 [path2...] [opts]

Options:
--all, -a        Run all tests (don't stop at 1st failure)
--exclude, -e    Exclude path prefix (multiple, always 'test/fixtures')
--csv            Export results as CSV
--json           Export results as JSON
-o               Output file path for exported results
--timeout, -t    Set default timeout value (milliseconds)
--watch, -w      Watch given files/dirs for changes

--help, -h       Print this help and quit
`);
				return 0;
			default:
				if (/^--?/.test(args[i])) {
					console.warn(`unknown option: ${args[i]}`);
					return 1;
				}
				res.rest.push(args[i]);
				break;
		}
	}
	if (res.out && res.csv && res.json) {
		console.warn(
			"only CSV *or* JSON file output is supported, not both at the same time, exiting..."
		);
		return 1;
	}
	return res;
};

/**
 * Recursively reads given directory and yields sequence of file names matching
 * given extension (or regexp).
 *
 * @param dir -
 * @param match -
 * @param maxDepth -
 * @param depth -
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
				r.error ? r.error.message.split("\n")[0] : "",
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
			error: r.error ? r.error.message.split("\n")[0] : undefined,
		})),
		null,
		4
	);

const randomID = () => `#${(Math.random() * 1e9) | 0}`;

const runTests = async (opts: TestamentArgs) => {
	const imports: Promise<any>[] = [];
	const sources: string[] = [];
	const excludes = opts.exclude.map((x) => resolve(x));

	const enque = (src: string) => {
		src += randomID();
		sources.push(src);
		imports.push(import(src));
	};

	for (let src of opts.rest) {
		src = resolve(src);
		if (statSync(src).isDirectory()) {
			for (let f of files(src, /\.[jt]s$/)) {
				if (excludes.some((prefix) => f.startsWith(prefix))) continue;
				enque(f);
			}
		} else {
			enque(src);
		}
	}

	GLOBAL_OPTS.logger.info(`importing ${imports.length} sources...`);
	try {
		await Promise.all(imports);
		const results = await execute();
		opts.csv && output(formatCSV(results), opts.out);
		opts.json && output(formatJSON(results), opts.out);
	} catch (e) {
		if (GLOBAL_OPTS.exit) throw e;
	}
};

const watchTests = async (opts: TestamentArgs) => {
	const watcher = watch(opts.rest, { persistent: true });
	const files = new Set<string>();
	let tid: NodeJS.Timeout;

	const rerunWith = (files: string[]) => {
		clearTimeout(tid);
		tid = setTimeout(() => runTests({ ...opts, rest: files }), 10);
	};

	GLOBAL_OPTS.logger.info("watching files... Press <Ctrl+C> to abort");

	watcher.on("all", (id, path) => {
		switch (id) {
			case "add":
				files.add(path);
				rerunWith([...files]);
				break;
			case "change":
				files.add(path);
				rerunWith([path]);
				break;
			case "unlink":
				files.delete(path);
				break;
			default:
		}
	});
};

(async () => {
	const opts = parseOpts(process.argv);
	if (typeof opts === "number") process.exit(opts);

	// enable ANSI coloring for status messages
	if (!process.env.NO_COLOR) {
		GLOBAL_OPTS.fmt = {
			success: (x) => `\x1b[32m✔︎ ${x}\x1b[0m`,
			fail: (x) => `\x1b[31m✘ ${x}\x1b[0m`,
			retry: (x) => `\x1b[93m${x}\x1b[0m`,
		};
	}

	if (opts.watch) {
		watchTests(opts);
	} else {
		GLOBAL_OPTS.exit = true;
		await runTests(opts);
	}
})();
