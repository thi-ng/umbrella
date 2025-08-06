// SPDX-License-Identifier: Apache-2.0
// thing:no-export
import {
	ARG_DRY_RUN,
	ARG_VERBOSE,
	ParseError,
	THING_HEADER,
	flag,
	parse,
	usage,
	type Args,
	type UsageOpts,
} from "@thi.ng/args";
import { readJSON, writeText } from "@thi.ng/file-io";
import { ConsoleLogger } from "@thi.ng/logger";
import { join } from "node:path";
import type { TangleCtx } from "./api.js";
import { tangleFile } from "./tangle.js";

interface CLIOpts {
	dryRun: boolean;
	noComments: boolean;
	verbose: boolean;
}

const argOpts: Args<CLIOpts> = {
	...ARG_DRY_RUN,
	...ARG_VERBOSE,
	noComments: flag({ default: false, desc: "don't generate comments" }),
};

export const PKG = readJSON(join(process.argv[2], "package.json"));

export const APP_NAME = PKG.name.split("/")[1];

export const HEADER = THING_HEADER(
	PKG.name,
	PKG.version,
	"Literate programming code block tangling"
);

const usageOpts: Partial<UsageOpts> = {
	lineWidth: process.stdout.columns,
	prefix: `${HEADER}

usage: ${APP_NAME} [OPTS] SOURCE-FILES(S) ...
       ${APP_NAME} --help

`,
	showGroupNames: true,
	paramWidth: 20,
};

const showUsage = () => {
	process.stderr.write(usage(argOpts, usageOpts));
	process.exit(1);
};

try {
	const result = parse(argOpts, process.argv, { start: 3, usageOpts });
	if (!result) process.exit(1);

	const { result: opts, rest } = result!;
	if (!rest.length) showUsage();

	let ctx: Partial<TangleCtx> = {
		logger: new ConsoleLogger("tangle", opts.verbose ? "DEBUG" : "INFO"),
		opts: {
			comments: opts.noComments !== true,
		},
	};

	for (let file of rest) {
		ctx = tangleFile(file, ctx);
	}
	for (let out in ctx.outputs!) {
		writeText(out, ctx.outputs![out], ctx.logger, opts.dryRun);
	}
} catch (e) {
	if (!(e instanceof ParseError)) process.stderr.write((<Error>e).message);
	process.exit(1);
}
