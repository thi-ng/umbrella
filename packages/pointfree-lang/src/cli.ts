// thing:no-export
import type { FnU, IObjectOf } from "@thi.ng/api";
import { flag, parse, string, usage, type Args } from "@thi.ng/args";
import { timedResult } from "@thi.ng/bench";
import { ConsoleLogger, NULL_LOGGER } from "@thi.ng/logger";
import { ensureStack, type StackContext } from "@thi.ng/pointfree";
import { readFileSync, readdirSync, writeFileSync } from "fs";
import { ffi, run, runU } from "./runtime.js";

interface CLIOpts {
	debug: boolean;
	exec?: string;
}

const showUsage = () => {
	process.stderr.write(
		usage(argOpts, { prefix: "Usage: pointfree [opts] [file]" })
	);
	process.exit(1);
};

const argOpts: Args<CLIOpts> = {
	debug: flag({ alias: "d", desc: "print debug info", group: "main" }),
	exec: string({ alias: "e", desc: "execute given string" }),
};

const result = parse(argOpts, process.argv);
if (!result) process.exit(1);

const { result: opts, rest } = result!;
if (!(opts.exec || rest.length)) showUsage();

let src: string;

if (!opts.exec) {
	try {
		src = readFileSync(rest[0]).toString();
		rest.shift();
	} catch (e) {
		process.stderr.write(`error reading source file ${(<Error>e).message}`);
		process.exit(1);
	}
} else {
	src = opts.exec;
}

try {
	const logger = opts.debug ? new ConsoleLogger("pointfree") : NULL_LOGGER;
	const includeCache = new Set();
	const rootEnv = { args: rest };
	const builtins: IObjectOf<FnU<StackContext>> = {
		include: (ctx) => {
			const stack = ctx[0];
			ensureStack(stack, 1);
			const path = stack.pop();
			if (!includeCache.has(path)) {
				// cycle breaker
				// TODO use dgraph
				includeCache.add(path);
				logger.debug(`including: ${path}`);
				run(readFileSync(path).toString(), {
					...ctx[2],
					__vars: null,
				});
			} else {
				logger.debug(`\t${path} already included, skipping...`);
			}
			return ctx;
		},
		"read-file": (ctx) => {
			const stack = ctx[0];
			ensureStack(stack, 1);
			const path = stack.pop();
			logger.debug(`reading file: ${path}`);
			stack.push(readFileSync(path).toString());
			return ctx;
		},
		"write-file": (ctx) => {
			const stack = ctx[0];
			ensureStack(stack, 2);
			const path = stack.pop();
			logger.debug(`writing file: ${path}`);
			writeFileSync(path, stack.pop());
			return ctx;
		},
		"read-dir": (ctx) => {
			const stack = ctx[0];
			ensureStack(stack, 1);
			const path = stack.pop();
			logger.debug(`reading directory: ${path}`);
			stack.push(readdirSync(path));
			return ctx;
		},
	};
	const env = ffi(rootEnv, builtins);
	const [res, time] = timedResult(() => runU(src, env));
	logger.debug(`executed in ${time}ms`);
	process.exit(typeof res === "number" ? res : 0);
} catch (e) {
	console.log(e);
}
process.exit(1);
