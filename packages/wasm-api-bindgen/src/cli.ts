// SPDX-License-Identifier: Apache-2.0
// thing:no-export
import type { Keys } from "@thi.ng/api";
import {
	ARG_DRY_RUN,
	THING_HEADER,
	cliApp,
	configureLogLevel,
	flag,
	oneOf,
	oneOfMulti,
	string,
	strings,
	type Command,
	type CommandCtx,
} from "@thi.ng/args";
import { isArray, isPlainObject, isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { readJSON, readText, writeJSON, writeText } from "@thi.ng/file-io";
import type { ILogger } from "@thi.ng/logger";
import { mutIn } from "@thi.ng/paths";
import { dirname, join, resolve } from "node:path";
import type {
	CodeGenOpts,
	CodeGenOptsBase,
	FuncPointer,
	Struct,
	TopLevelType,
	TypeColl,
} from "./api.js";
import { C11, type C11Opts } from "./c11.js";
import { generateTypes } from "./codegen.js";
import {
	isExternal,
	isOpaque,
	isPadding,
	isSizeT,
	isWasmPrim,
	isWasmString,
} from "./internal/utils.js";
import { TYPESCRIPT, type TSOpts } from "./typescript.js";
import { ZIG, type ZigOpts } from "./zig.js";

const GENERATORS = <const>{ c11: C11, ts: TYPESCRIPT, zig: ZIG };

type Language = Keys<typeof GENERATORS>;

interface CLIOpts {
	analytics?: string;
	config?: string;
	debug: boolean;
	dryRun: boolean;
	lang: Language[];
	out?: string[];
	string?: CodeGenOpts["stringType"];
}

interface Ctx {
	logger: ILogger;
	opts: CLIOpts;
	config: Partial<GenConfig>;
}

interface GenConfig {
	global: Partial<CodeGenOpts>;
	c11: Partial<C11Opts>;
	ts: Partial<TSOpts>;
	zig: Partial<ZigOpts>;
}

export const PKG = readJSON(join(process.argv[2], "package.json"));

export const APP_NAME = PKG.name.split("/")[1];

export const HEADER = THING_HEADER(
	PKG.name,
	PKG.version,
	"Multi-language data bindings code generator"
);

const invalidSpec = (path: string, msg?: string) => {
	throw new Error(`invalid typedef: ${path}${msg ? ` (${msg})` : ""}`);
};

const addTypeSpec = (
	ctx: Ctx,
	path: string,
	coll: TypeColl,
	spec: TopLevelType
) => {
	if (!(spec.name && spec.type)) invalidSpec(path);
	if (!["enum", "ext", "funcptr", "struct", "union"].includes(spec.type))
		invalidSpec(path, `${spec.name} type: ${spec.type}`);
	if (coll[spec.name]) invalidSpec(path, `duplicate name: ${spec.name}`);

	if (spec.body) {
		if (!isPlainObject(spec.body))
			invalidSpec(path, `${spec.name}.body must be an object`);
		for (let lang in spec.body) {
			const src = spec.body[lang];
			if (isString(src) && src[0] === "@") {
				spec.body[lang] = readText(src.substring(1), ctx.logger);
			}
		}
	}
	ctx.logger.debug(`registering ${spec.type}: ${spec.name}`);
	coll[spec.name] = spec;
	(<any>spec).__path = path;
};

const validateTypeRefs = (coll: TypeColl) => {
	for (let spec of Object.values(coll)) {
		if (!["funcptr", "struct", "union"].includes(spec.type)) continue;
		for (let f of (<Struct>spec).fields || (<FuncPointer>spec).args) {
			if (
				!(
					isPadding(f) ||
					isWasmPrim(f.type) ||
					isSizeT(f.type) ||
					isOpaque(f.type) ||
					isWasmString(f.type) ||
					isExternal(f.type, coll) ||
					coll[f.type]
				)
			) {
				invalidSpec(
					(<any>spec).__path,
					`${spec.name}.${f.name} has unknown type: ${f.type}`
				);
			}
		}
	}
};

const parseTypeSpecs = (ctx: Ctx, inputs: string[]) => {
	const coll: TypeColl = {};
	for (let path of inputs) {
		try {
			const spec = readJSON(resolve(path), ctx.logger);
			if (isArray(spec)) {
				for (let s of spec) addTypeSpec(ctx, path, coll, s);
			} else if (isPlainObject(spec)) {
				addTypeSpec(ctx, path, coll, <TopLevelType>spec);
			} else {
				invalidSpec(path);
			}
		} catch (e) {
			process.stderr.write((<Error>e).message);
			process.exit(1);
		}
	}
	validateTypeRefs(coll);
	return coll;
};

const generateOutputs = ({ config, logger, opts }: Ctx, coll: TypeColl) => {
	for (let i = 0; i < opts.lang.length; i++) {
		const lang = opts.lang[i];
		logger.debug(`generating ${lang.toUpperCase()} output...`);
		const src = generateTypes(
			coll,
			GENERATORS[lang](config[lang]),
			config.global
		);
		if (opts.out) {
			writeText(resolve(opts.out[i]), src, logger, opts.dryRun);
		} else {
			process.stdout.write(src + "\n");
		}
	}
};

const resolveUserCode = (
	ctx: Ctx,
	conf: Partial<CodeGenOptsBase>,
	key: "pre" | "post"
) => {
	if (conf[key]) {
		if (isString(conf[key]) && conf[key]![0] === "@") {
			conf[key] = readText(
				resolve(
					dirname(ctx.opts.config!),
					(<string>conf[key]).substring(1)
				),
				ctx.logger
			);
		}
	}
};

const CMD: Command<CLIOpts, CLIOpts> = {
	desc: "",
	opts: {},
	inputs: [1, Infinity],
	fn: async ({ opts, inputs, logger }) => {
		if (opts.out && opts.lang.length !== opts.out.length) {
			illegalArgs(
				`expected ${opts.lang.length} outputs, but got ${opts.out.length}`
			);
		}

		const ctx: Ctx = {
			logger,
			config: { global: {} },
			opts,
		};

		if (opts.config) {
			opts.config = resolve(opts.config);
			ctx.config = readJSON(opts.config, ctx.logger);
			for (let id in ctx.config) {
				const conf = ctx.config[<keyof GenConfig>id]!;
				resolveUserCode(ctx, conf, "pre");
				resolveUserCode(ctx, conf, "post");
			}
		}
		opts.debug && mutIn(ctx, ["config", "global", "debug"], true);
		opts.string &&
			mutIn(ctx, ["config", "global", "stringType"], opts.string);

		const types = parseTypeSpecs(ctx, inputs);
		generateOutputs(ctx, types);

		if (ctx.opts.analytics) {
			// always write analytics, even if dry run
			writeJSON(
				resolve(ctx.opts.analytics),
				types,
				undefined,
				"\t",
				ctx.logger
			);
		}
	},
};

cliApp<CLIOpts, CommandCtx<CLIOpts, CLIOpts>>({
	name: APP_NAME,
	start: 3,
	opts: {
		...ARG_DRY_RUN,
		analytics: string({
			alias: "a",
			hint: "FILE",
			desc: "output file path for raw codegen analytics",
		}),
		config: string({
			alias: "c",
			hint: "FILE",
			desc: "JSON config file with codegen options",
		}),
		debug: flag({
			alias: "d",
			default: false,
			desc: "enable debug output & functions",
		}),
		lang: oneOfMulti({
			alias: "l",
			desc: "target language",
			opts: <Language[]>Object.keys(GENERATORS),
			default: ["ts", "zig"],
			delim: ",",
		}),
		out: strings({ alias: "o", hint: "FILE", desc: "output file path" }),
		string: oneOf({
			alias: "s",
			hint: "TYPE",
			desc: "Force string type implementation",
			opts: ["slice", "ptr"],
		}),
	},
	commands: { CMD },
	single: true,
	usage: {
		lineWidth: process.stdout.columns,
		prefix: `${HEADER}

usage: ${APP_NAME} [OPTS] JSON-INPUT-FILE(S) ...
       ${APP_NAME} --help\n`,
		showGroupNames: true,
		paramWidth: 32,
	},
	ctx: async (ctx) => {
		configureLogLevel(ctx.logger, ctx.opts.debug);
		return ctx;
	},
});
