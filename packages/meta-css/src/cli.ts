// thing:no-export
import { cliApp, flag, string } from "@thi.ng/args";
import { readJSON } from "@thi.ng/file-io";
import { LogLevel } from "@thi.ng/logger";
import { PRESET_ANSI16 } from "@thi.ng/text-format";
import { resolve } from "path";
import type { AppCtx, CommonOpts } from "./api.js";
import { CONVERT } from "./convert.js";
import { GENERATE } from "./generate.js";

const PKG = readJSON(resolve(process.argv[2], "../package.json"));

cliApp<CommonOpts, AppCtx<any>>({
	name: "metacss",
	start: 3,
	opts: {
		out: string({
			alias: "o",
			default: "",
			desc: "Output dir (or stdout)",
		}),
		verbose: flag({
			alias: "v",
			desc: "Display extra process information",
		}),
	},
	commands: {
		convert: CONVERT,
		generate: GENERATE,
	},
	ctx: async (ctx) => {
		if (ctx.opts.verbose) ctx.logger.level = LogLevel.DEBUG;
		return { ...ctx, format: PRESET_ANSI16 };
	},
	usage: {
		prefix: `
 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ ${PKG.name} ${PKG.version}
 █ █ █ █ █ █ █ █ █ │ ${PKG.description}
                 █ │
               █ █ │

Usage: metacss <cmd> [opts] input [...]
Usage: metacss <cmd> --help\n`,
		showGroupNames: true,
		paramWidth: 24,
	},
});
