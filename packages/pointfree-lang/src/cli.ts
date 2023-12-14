// thing:no-export
import type { FnU, IObjectOf } from "@thi.ng/api";
import { cliApp, flag, string, type Command } from "@thi.ng/args";
import { timedResult } from "@thi.ng/bench";
import { readJSON, readText, writeFile } from "@thi.ng/file-io";
import { LogLevel } from "@thi.ng/logger";
import { ensureStack, type StackContext } from "@thi.ng/pointfree";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import { ffi, run, runU } from "./runtime.js";

interface CLIOpts {
	debug: boolean;
	exec?: string;
}

const PKG = readJSON(resolve(process.argv[2], "../package.json"));

const CMD: Command<CLIOpts, CLIOpts> = {
	desc: "",
	opts: {},
	fn: async ({ logger, opts, inputs }) => {
		let src = opts.exec;
		if (!src) {
			if (!inputs.length) {
				process.stderr.write(`require --exec option or a source file`);
				process.exit(1);
			}
			try {
				src = readFileSync(inputs[0]).toString();
				inputs.shift();
			} catch (e) {
				process.stderr.write(
					`error reading source file ${(<Error>e).message}`
				);
				process.exit(1);
			}
		}
		const includeCache = new Set();
		const rootEnv = { args: inputs };
		const builtins: IObjectOf<FnU<StackContext>> = {
			include: (ctx) => {
				const stack = ctx[0];
				ensureStack(stack, 1);
				const path = stack.pop();
				if (!includeCache.has(path)) {
					// cycle breaker
					// TODO use dgraph
					includeCache.add(path);
					run(readText(path, logger), {
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
				stack.push(readText(path, logger));
				return ctx;
			},
			"write-file": (ctx) => {
				const stack = ctx[0];
				ensureStack(stack, 2);
				const path = stack.pop();
				writeFile(path, stack.pop(), undefined, logger);
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
		const [res, time] = timedResult(() => runU(src!, env));
		logger.debug(`executed in ${time}ms`);
		process.exit(typeof res === "number" ? res : 0);
	},
};

cliApp({
	name: "pointfree",
	start: 3,
	opts: {
		debug: flag({ alias: "d", desc: "print debug info", group: "main" }),
		exec: string({ alias: "e", default: "", desc: "execute given string" }),
	},
	commands: { CMD },
	single: true,
	usage: {
		prefix: `
 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ ${PKG.name} v${PKG.version}
 █ █ █ █ █ █ █ █ █ │ Forth-style DSL & CLI
                 █ │
               █ █ │

Usage: pointfree [opts] [file]\n\n`,
		paramWidth: 24,
	},
	ctx: async (ctx) => {
		if (ctx.opts.debug) ctx.logger.level = LogLevel.DEBUG;
		return ctx;
	},
});
