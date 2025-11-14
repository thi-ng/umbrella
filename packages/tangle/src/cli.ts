// SPDX-License-Identifier: Apache-2.0
// thing:no-export
import {
	ARG_DRY_RUN,
	ARG_VERBOSE,
	THING_HEADER,
	cliApp,
	configureLogLevel,
	flag,
	type Command,
} from "@thi.ng/args";
import { readJSON, writeText } from "@thi.ng/file-io";
import { join } from "node:path";
import type { TangleCtx } from "./api.js";
import { tangleFile } from "./tangle.js";

interface CLIOpts {
	dryRun: boolean;
	noComments: boolean;
	verbose: boolean;
}

export const PKG = readJSON(join(process.argv[2], "package.json"));

export const APP_NAME = PKG.name.split("/")[1];

export const HEADER = THING_HEADER(
	PKG.name,
	PKG.version,
	"Literate programming code block tangling"
);

const CMD: Command<CLIOpts, CLIOpts> = {
	desc: "",
	opts: {},
	inputs: [1, Infinity],
	fn: async ({ opts, inputs, logger }) => {
		let ctx: Partial<TangleCtx> = {
			logger,
			opts: {
				comments: opts.noComments !== true,
			},
		};

		for (let file of inputs) {
			ctx = tangleFile(file, ctx);
		}
		for (let out in ctx.outputs!) {
			writeText(out, ctx.outputs![out], ctx.logger, opts.dryRun);
		}
	},
};

cliApp({
	name: "tangle",
	start: 3,
	opts: {
		...ARG_DRY_RUN,
		...ARG_VERBOSE,
		noComments: flag({ default: false, desc: "don't generate comments" }),
	},
	commands: { CMD },
	single: true,
	usage: {
		lineWidth: process.stdout.columns,
		prefix: `${HEADER}

usage: ${APP_NAME} [OPTS] SOURCE-FILES(S) ...
       ${APP_NAME} --help

`,
		showGroupNames: true,
		paramWidth: 20,
	},
	ctx: async (ctx) => {
		configureLogLevel(ctx.logger, ctx.opts.verbose);
		return ctx;
	},
});
