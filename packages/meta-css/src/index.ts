import { cliApp, flag } from "@thi.ng/args";
import { readJSON } from "@thi.ng/file-io";
import { LogLevel } from "@thi.ng/logger";
import { PRESET_ANSI16 } from "@thi.ng/text-format";
import { join } from "node:path";
import type { AppCtx, CommonOpts } from "./api.js";
import { CONVERT } from "./convert.js";
import { DEVELOP } from "./develop.js";
import { EXPORT } from "./export.js";
import { GENERATE } from "./generate.js";

const PKG = readJSON(join((<any>import.meta).dir, "package.json"));

cliApp<CommonOpts, AppCtx<any>>({
	name: "metacss",
	opts: {
		verbose: flag({
			alias: "v",
			desc: "Display extra process information",
		}),
	},
	commands: {
		convert: CONVERT,
		develop: DEVELOP,
		export: EXPORT,
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
       metacss <cmd> --help\n`,
		showGroupNames: true,
		paramWidth: 24,
	},
});
