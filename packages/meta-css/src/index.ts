// SPDX-License-Identifier: Apache-2.0
import {
	ARG_VERBOSE,
	cliApp,
	configureLogLevel,
	THING_HEADER,
} from "@thi.ng/args";
import { readJSON } from "@thi.ng/file-io";
import { PRESET_ANSI16 } from "@thi.ng/text-format";
import { join } from "node:path";
import type { AppCtx, CommonOpts } from "./api.js";
import { CONVERT } from "./convert.js";
import { DEVELOP } from "./develop.js";
import { DOC } from "./doc.js";
import { EXPORT } from "./export.js";
import { GENERATE } from "./generate.js";

const PKG = readJSON(join(process.argv[2], "package.json"));

cliApp<CommonOpts, AppCtx<any>>({
	name: "metacss",
	start: 3,
	opts: { ...ARG_VERBOSE },
	commands: {
		convert: CONVERT,
		develop: DEVELOP,
		doc: DOC,
		export: EXPORT,
		generate: GENERATE,
	},
	ctx: async (ctx) => {
		configureLogLevel(ctx.logger, ctx.opts.verbose);
		return { ...ctx, format: PRESET_ANSI16 };
	},
	usage: {
		prefix: `${THING_HEADER(PKG.name, PKG.version, PKG.description)}

Usage: metacss <cmd> [opts] input [...]
       metacss <cmd> --help\n\n`,
		showGroupNames: true,
		paramWidth: 24,
	},
});
