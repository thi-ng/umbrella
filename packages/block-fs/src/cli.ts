// SPDX-License-Identifier: Apache-2.0
import { cliApp, flag, THING_HEADER } from "@thi.ng/args";
import { readJSON } from "@thi.ng/file-io";
import { LogLevel } from "@thi.ng/logger";
import { join } from "node:path";
import type { AppCtx, CLIOpts } from "./cli/api.js";
import { CONVERT } from "./cli/convert.js";
import { LIST } from "./cli/list.js";

const PKG = readJSON(join(process.argv[2], "package.json"));

cliApp<CLIOpts, AppCtx<any>>({
	name: "blockfs",
	start: 3,
	opts: {
		verbose: flag({
			alias: "v",
			desc: "Display extra logging information",
		}),
		quiet: flag({
			alias: "q",
			desc: "Disable logging",
		}),
	},
	commands: {
		convert: CONVERT,
		list: LIST,
	},
	ctx: async (ctx) => {
		if (ctx.opts.quiet) ctx.logger.level = LogLevel.NONE;
		else if (ctx.opts.verbose) ctx.logger.level = LogLevel.DEBUG;
		return ctx;
	},
	usage: {
		prefix: `${THING_HEADER(
			PKG.name,
			PKG.version,
			"Block-based storage & file system layer"
		)}

Usage: blockfs <cmd> [opts] input [...]
       blockfs <cmd> --help\n`,
		showGroupNames: true,
		paramWidth: 32,
	},
});
