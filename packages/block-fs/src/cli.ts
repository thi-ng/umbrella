// SPDX-License-Identifier: Apache-2.0
import {
	ARG_QUIET,
	ARG_VERBOSE,
	cliApp,
	configureLogLevel,
	THING_HEADER,
} from "@thi.ng/args";
import { readJSON } from "@thi.ng/file-io";
import { join } from "node:path";
import type { AppCtx, CLIOpts } from "./cli/api.js";
import { CONVERT } from "./cli/convert.js";
import { LIST } from "./cli/list.js";

const PKG = readJSON(join(process.argv[2], "package.json"));

cliApp<CLIOpts, AppCtx<any>>({
	name: "blockfs",
	start: 3,
	opts: {
		...ARG_QUIET,
		...ARG_VERBOSE,
	},
	commands: {
		convert: CONVERT,
		list: LIST,
	},
	ctx: async (ctx) => {
		configureLogLevel(ctx.logger, ctx.opts.verbose, ctx.opts.quiet);
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
