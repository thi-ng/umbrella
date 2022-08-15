// thing:no-export
import type { Keys } from "@thi.ng/api";
import {
	Args,
	flag,
	oneOfMulti,
	parse,
	ParseError,
	string,
	strings,
	usage,
	UsageOpts,
} from "@thi.ng/args";
import { isArray, isPlainObject } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { readJSON, writeText } from "@thi.ng/file-io";
import { ConsoleLogger, ILogger } from "@thi.ng/logger";
import { resolve } from "path";
import type { Struct, TopLevelType, TypeColl } from "./api.js";
import { CodeGenOpts, generateTypes } from "./codegen.js";
import { TSOpts, TYPESCRIPT } from "./codegen/typescript.js";
import { isPrim } from "./codegen/utils.js";
import { ZIG, ZigOpts } from "./codegen/zig.js";

const GENERATORS = <const>{ ts: TYPESCRIPT, zig: ZIG };

type Language = Keys<typeof GENERATORS>;

interface CLIOpts {
	config?: string;
	debug: boolean;
	dryRun: boolean;
	lang: Language[];
	out?: string[];
}

interface Ctx {
	logger: ILogger;
	opts: CLIOpts;
	config: Partial<GenConfig>;
}

interface GenConfig {
	global: Partial<CodeGenOpts>;
	ts: Partial<TSOpts>;
	zig: Partial<ZigOpts>;
}

const argOpts: Args<CLIOpts> = {
	config: string({
		alias: "c",
		hint: "FILE",
		desc: "JSON config file with codegen options",
	}),
	debug: flag({ alias: "d", default: false, desc: "enable debug output" }),
	dryRun: flag({
		default: false,
		desc: "enable dry run (don't overwrite files)",
	}),
	lang: oneOfMulti(<Language[]>Object.keys(GENERATORS), {
		alias: "l",
		desc: "target language",
		default: ["ts", "zig"],
		delim: ",",
	}),
	out: strings({ alias: "o", hint: "FILE", desc: "output file path" }),
};

export const INSTALL_DIR = resolve(`${process.argv[2]}/..`);

export const PKG = readJSON(`${INSTALL_DIR}/package.json`);

export const APP_NAME = PKG.name.split("/")[1];

export const HEADER = `
 █ █   █           │
██ █               │
 █ █ █ █   █ █ █ █ │ ${PKG.name} ${PKG.version}
 █ █ █ █ █ █ █ █ █ │ Multi-language data bindings code generator
                 █ │
               █ █ │
`;

const usageOpts: Partial<UsageOpts> = {
	lineWidth: process.stdout.columns,
	prefix: `${HEADER}
usage: ${APP_NAME} [OPTS] JSON-INPUT-FILE(S) ...
       ${APP_NAME} --help

`,
	showGroupNames: true,
	paramWidth: 32,
};

const showUsage = () => {
	process.stderr.write(usage(argOpts, usageOpts));
	process.exit(1);
};

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
	if (!(spec.type === "enum" || spec.type === "struct"))
		invalidSpec(path, `${spec.name} type: ${spec.type}`);
	if (coll[spec.name]) invalidSpec(path, `duplicate name: ${spec.name}`);

	ctx.logger.debug(`registering ${spec.type}: ${spec.name}`);
	coll[spec.name] = spec;
	(<any>spec).__path = path;
};

const validateTypeRefs = (coll: TypeColl) => {
	for (let spec of Object.values(coll)) {
		if (spec.type !== "struct") continue;
		for (let f of (<Struct>spec).fields) {
			if (!(isPrim(f.type) || coll[f.type])) {
				invalidSpec(
					(<any>spec).__path,
					`structfield ${spec.name}.${f.name} of unknown type: ${f.type}`
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

try {
	const result = parse(argOpts, process.argv, { start: 3, usageOpts });
	if (!result) process.exit(1);

	const { result: opts, rest } = result!;
	if (!rest.length) showUsage();

	if (opts.out && opts.lang.length != opts.out.length) {
		illegalArgs(
			`expected ${opts.lang.length} outputs, but got ${opts.out.length}`
		);
	}

	const ctx: Ctx = {
		logger: new ConsoleLogger("wasm-api", opts.debug ? "DEBUG" : "INFO"),
		config: {},
		opts,
	};

	if (opts.config) {
		ctx.config = readJSON(resolve(opts.config), ctx.logger);
	}

	generateOutputs(ctx, parseTypeSpecs(ctx, rest));
} catch (e) {
	if (!(e instanceof ParseError)) process.stderr.write((<Error>e).message);
	process.exit(1);
}
