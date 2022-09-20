// thing:no-export
import { Args, flag, parse, ParseError, usage, UsageOpts } from "@thi.ng/args";
import { readJSON, writeText } from "@thi.ng/file-io";
import { ConsoleLogger } from "@thi.ng/logger";
import { resolve } from "path";
import type { TangleCtx } from "./api.js";
import { tangleFile } from "./tangle.js";

interface CLIOpts {
	debug: boolean;
	dryRun: boolean;
	noComments: boolean;
}

const argOpts: Args<CLIOpts> = {
	noComments: flag({ default: false, desc: "don't generate comments" }),
	debug: flag({ alias: "d", default: false, desc: "enable debug output" }),
	dryRun: flag({
		default: false,
		desc: "enable dry run (don't overwrite files)",
	}),
};

export const INSTALL_DIR = resolve(`${process.argv[2]}/..`);

export const PKG = readJSON(`${INSTALL_DIR}/package.json`);

export const APP_NAME = PKG.name.split("/")[1];

export const HEADER = `
 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ ${PKG.name} ${PKG.version}
 █ █ █ █ █ █ █ █ █ │ Literate programming code block tangling
                 █ │
               █ █ │
`;

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
		logger: new ConsoleLogger("tangle", opts.debug ? "DEBUG" : "INFO"),
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
