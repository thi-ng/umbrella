// thing:no-export
import type { Fn0, IObjectOf } from "@thi.ng/api";
import { flag, type Command } from "@thi.ng/args";
import { peek } from "@thi.ng/arrays";
import { isString } from "@thi.ng/checks";
import { assert, illegalArgs, illegalState } from "@thi.ng/errors";
import { readJSON, readText } from "@thi.ng/file-io";
import {
	COMPACT,
	PRETTY,
	QUOTED_FNS,
	at_media,
	css,
	type Format,
} from "@thi.ng/hiccup-css";
import { type ILogger } from "@thi.ng/logger";
import { sync } from "@thi.ng/rstream";
import { interpolate, split } from "@thi.ng/strings";
import { filter, map } from "@thi.ng/transducers";
import { watch } from "node:fs";
import { resolve } from "node:path";
import {
	ARG_BUNDLE,
	ARG_EVAL,
	ARG_FORCE_INCLUDE,
	ARG_INCLUDE,
	ARG_NO_DECLS,
	ARG_NO_HEADER,
	ARG_OUTPUT,
	ARG_PRETTY,
	ARG_SPECS,
	ARG_WATCH,
	type AppCtx,
	type CommonOpts,
	type CompiledSpecs,
} from "./api.js";
import {
	watchInputs as $watch,
	generateHeader,
	maybeWriteText,
} from "./utils.js";

type State = "sel" | "class" | "nest";

export interface ConvertOpts extends CommonOpts {
	out?: string;
	specs: string;
	include?: string[];
	eval?: string;
	force?: string[];
	bundle: boolean;
	pretty: boolean;
	noDecls: boolean;
	noHeader: boolean;
	noWrite: boolean;
	watch: boolean;
}

interface Scope {
	state: State;
	sel: string[];
	path: string;
	parent?: Scope;
}

interface ProcessCtx {
	root: Scope;
	curr: Scope;
	scopes: Scope[];
}

export interface ProcessOpts {
	logger: ILogger;
	format: Format;
	specs: CompiledSpecs;
	plainRules: IObjectOf<Set<string>>;
	mediaQueryIDs: Set<string>;
	mediaQueryRules: IObjectOf<IObjectOf<Set<string>>>;
}

export const CONVERT: Command<ConvertOpts, CommonOpts, AppCtx<ConvertOpts>> = {
	desc: "Transpile (and optionally bundle) meta stylesheets to CSS",
	opts: {
		...ARG_BUNDLE,
		...ARG_EVAL,
		...ARG_NO_DECLS,
		...ARG_FORCE_INCLUDE,
		...ARG_INCLUDE,
		...ARG_NO_HEADER,
		...ARG_OUTPUT,
		...ARG_PRETTY,
		...ARG_SPECS,
		...ARG_WATCH,
		noWrite: flag({ desc: "Don't write files, use stdout only" }),
	},
	fn: convertCommand,
};

export async function convertCommand(ctx: AppCtx<ConvertOpts>) {
	const specs = readJSON<CompiledSpecs>(resolve(ctx.opts.specs), ctx.logger);
	const forceRules = processForceIncludes(
		specs,
		ctx.opts.force || [],
		ctx.logger
	);
	if (ctx.opts.bundle) {
		if (ctx.opts.watch) {
			await watchBundleInputs(ctx, forceRules);
		} else {
			processInputs(
				ctx,
				specs,
				forceRules,
				ctx.opts.eval
					? [ctx.opts.eval]
					: ctx.inputs.map((file) =>
							readText(resolve(file), ctx.logger)
					  ),
				ctx.opts.out
			);
		}
	} else {
		if (ctx.opts.watch) {
			await watchInputs(ctx, specs, forceRules);
		} else if (ctx.opts.eval) {
			try {
				processInputs(ctx, specs, forceRules, [ctx.opts.eval]);
			} catch (e) {
				ctx.logger.warn((<Error>e).message);
			}
		} else {
			for (let file of ctx.inputs) {
				try {
					file = resolve(file);
					const outFile = !ctx.opts.noWrite
						? file.replace(/\.mcss$/, ".css")
						: undefined;
					processInputs(
						ctx,
						specs,
						forceRules,
						[readText(file, ctx.logger)],
						outFile
					);
				} catch (e) {
					ctx.logger.warn((<Error>e).message);
				}
			}
		}
	}
}

const watchInputs = async (
	ctx: AppCtx<ConvertOpts>,
	specs: CompiledSpecs,
	forceRules: ReturnType<typeof processForceIncludes>
) => {
	type WatchedInput = {
		process: Fn0<boolean>;
		watcher: { close: Fn0<void> };
	};
	const specFile = resolve(ctx.opts.specs);
	let inputs: WatchedInput[];
	let specInput: WatchedInput = {
		process: () => {
			try {
				specs = readJSON(specFile, ctx.logger);
				inputs.forEach((x) => x.process());
				return true;
			} catch (e) {
				ctx.logger.warn((<Error>e).message + ": " + specFile);
				return false;
			}
		},
		watcher: watch(specFile, {}, (event) => {
			if (event === "change") {
				specInput.process();
			} else {
				ctx.logger.warn(`specs file removed:`, specFile);
				close();
			}
		}),
	};
	const close = () => {
		ctx.logger.info("closing watchers...");
		specInput.watcher.close();
		inputs.forEach((x) => x.watcher.close());
	};

	inputs = ctx.inputs.map((file) => {
		file = resolve(file);
		const outFile = !ctx.opts.noWrite
			? file.replace(/\.mcss$/, ".css")
			: undefined;
		const $process = () => {
			try {
				processInputs(
					ctx,
					specs,
					forceRules,
					[readText(file, ctx.logger)],
					outFile
				);
				return true;
			} catch (e) {
				ctx.logger.warn((<Error>e).message + ": " + file);
				if (inputs) close();
				return false;
			}
		};
		if (!$process()) process.exit(1);
		return {
			process: $process,
			watcher: watch(file, {}, (event) => {
				if (event === "change") {
					$process();
				} else {
					ctx.logger.warn(`input removed:`, file);
					close();
				}
			}),
		};
	});
	ctx.logger.info("waiting for changes, press ctrl+c to cancel...");
	// close watchers when ctrl-c is pressed
	process.on("SIGINT", close);
};

const watchBundleInputs = async (
	ctx: AppCtx<ConvertOpts>,
	forceRules: ReturnType<typeof processForceIncludes>
) => {
	sync({
		src: {
			styles: $watch(ctx.inputs, ctx.logger),
			specs: $watch([ctx.opts.specs], ctx.logger).map(
				(x) => <CompiledSpecs>JSON.parse(Object.values(x)[0])
			),
		},
	}).subscribe({
		next({ styles, specs }) {
			try {
				processInputs(
					ctx,
					specs,
					forceRules,
					// process in deterministic order (same as given in CLI)
					Object.keys(styles)
						.sort()
						.map((k) => styles[k]),
					ctx.opts.out
				);
			} catch (e) {
				ctx.logger.warn((<Error>e).message);
			}
		},
	});
};

export const processInputs = (
	{
		logger,
		opts: { include, noDecls, noHeader, pretty },
	}: Pick<AppCtx<Omit<ConvertOpts, "noWrite">>, "logger" | "opts">,
	specs: CompiledSpecs,
	forceRules: ReturnType<typeof processForceIncludes>,
	inputs: string[],
	out?: string
) => {
	const procOpts: ProcessOpts = {
		logger,
		specs,
		format: pretty ? PRETTY : COMPACT,
		mediaQueryIDs: new Set(Object.keys(specs.media)),
		mediaQueryRules: { ...forceRules.mediaQueryRules },
		plainRules: { ...forceRules.plainRules },
	};
	const bundle: string[] = include
		? include.map((x) => readText(resolve(x), logger).trim())
		: [];
	if (!noHeader) bundle.push(generateHeader(specs));
	if (!noDecls && specs.decls.length) {
		bundle.push(
			css(specs.decls, { format: procOpts.format, fns: QUOTED_FNS })
		);
	}
	inputs.forEach((input) => processSpec(input, procOpts));
	processPlainRules(bundle, procOpts);
	processMediaQueries(bundle, procOpts);
	maybeWriteText(out, bundle, logger);
};

export const processMediaQueries = (
	result: string[],
	{ logger, specs, format, mediaQueryRules }: ProcessOpts
) => {
	for (let queryID in mediaQueryRules) {
		const rules = buildDecls(mediaQueryRules[queryID], specs);
		logger.debug("mediaquery rules", queryID, rules);
		result.push(
			css(at_media(mergeMediaQueries(specs.media, queryID), rules), {
				format,
				fns: QUOTED_FNS,
			})
		);
	}
};

export const processPlainRules = (
	bundle: string[],
	{ logger, specs, format, plainRules }: ProcessOpts
) => {
	const rules = buildDecls(plainRules, specs);
	logger.debug("plain rules", rules);
	bundle.push(css(rules, { format, fns: QUOTED_FNS }));
};

export const processForceIncludes = (
	specs: CompiledSpecs,
	classes: string[],
	logger: ILogger
) => {
	const mediaQueryIDs = new Set(Object.keys(specs.media));
	const allIDs = new Set(Object.keys(specs.classes));
	const mediaQueryRules: IObjectOf<IObjectOf<Set<string>>> = {};
	const plainRules: IObjectOf<Set<string>> = {};
	if (classes.length && classes[0][0] === "@") {
		classes = [
			...split(readText(resolve(classes[0].substring(1)), logger)),
		];
	}
	for (let id of classes) {
		if (!id || id.startsWith("//")) continue;
		const { token, query } = parseMediaQueryToken(id, mediaQueryIDs);
		let matches: string[];
		if (token.includes("*")) {
			const re = new RegExp(`^${token.replace("*", ".*")}$`);
			matches = [...filter((x) => re.test(x), allIDs)];
		} else {
			if (allIDs.has(token)) {
				matches = [token];
			} else {
				logger.warn(`unknown include rule ID: ${id}, skipping...`);
				continue;
			}
		}
		for (let match of matches) {
			logger.debug("including class:", match);
			query
				? addMediaQueryDef(mediaQueryRules, query, `.${match}`, match)
				: addPlainDef(plainRules, `.${match}`, match);
		}
	}
	return { mediaQueryRules, plainRules };
};

export const processSpec = (
	src: string,
	{ specs, mediaQueryIDs, mediaQueryRules, plainRules }: ProcessOpts
) => {
	const root = defScope();
	const initial = defScope(root);
	const ctx: ProcessCtx = {
		root,
		curr: initial,
		scopes: [initial],
	};

	// process line by line, skip comment lines
	for (let line of split(src)) {
		if (!line || /^\s*\/\//.test(line)) continue;
		for (let token of split(line, /\s+/g)) {
			if (!token) continue;
			let $scope = ctx.curr;
			switch ($scope.state) {
				case "sel":
				case "nest":
					if (token === "{") {
						if ($scope.state === "sel") {
							$scope.sel = $scope.sel.map((x) =>
								x.replace(",", "")
							);
							$scope.path = buildScopePath(ctx.scopes);
						}
						$scope.state = "class";
					} else if (token === "}") {
						endScope(ctx);
					} else {
						const last = peek($scope.sel);
						if (!last || last.endsWith(",")) {
							$scope.sel.push(token);
						} else {
							$scope.sel[$scope.sel.length - 1] += " " + token;
						}
					}
					break;
				case "class":
					if (token === "{") {
						$scope.state = "nest";
						ctx.scopes.push((ctx.curr = defScope($scope)));
					} else if (token === "}") {
						endScope(ctx);
					} else {
						let { token: id, query } = parseMediaQueryToken(
							token,
							mediaQueryIDs
						);
						if (
							!specs.classes[id] &&
							!(isAssignment(id) || isTemplateRef(id))
						)
							illegalArgs(`unknown class ID: ${id}`);
						if (query) {
							addMediaQueryDef(
								mediaQueryRules,
								query,
								$scope.path,
								id
							);
						} else {
							addPlainDef(plainRules, $scope.path, id);
						}
					}
					break;
				default:
					illegalState($scope.state);
			}
		}
	}
};

const QUERY_SEP = ":";
const PATH_SEP = "///";

const defScope = (parent?: Scope): Scope => ({
	state: "sel",
	sel: parent ? [] : ["<root>"],
	path: "",
	parent,
});

const endScope = (ctx: ProcessCtx) => {
	const isEmpty = !ctx.curr.sel.length;
	assert(!!ctx.curr.parent, "stack underflow");
	ctx.scopes.pop();
	if (ctx.scopes.length > 0) {
		ctx.curr = peek(ctx.scopes);
		if (!isEmpty && ctx.curr.state === "nest") {
			ctx.scopes.push((ctx.curr = defScope(ctx.curr)));
		}
	} else {
		ctx.scopes.push((ctx.curr = defScope(ctx.root)));
	}
};

const buildScopePath = (scopes: Scope[]) =>
	scopes.map((x) => x.sel.join(",")).join(PATH_SEP);

const buildDecls = (rules: IObjectOf<Set<string>>, specs: CompiledSpecs) =>
	Object.entries(rules).map(([path, ids]) =>
		buildDeclsForPath(path, ids, specs)
	);

const buildDeclsForPath = (
	selectorPath: string,
	ids: Iterable<string>,
	specs: CompiledSpecs
) => {
	const root: any[] = [];
	let parent = root;
	const parts = selectorPath.split(PATH_SEP);
	for (let i = 0; i < parts.length; i++) {
		const curr = parts[i].split(",");
		if (i == parts.length - 1) {
			const obj = Object.assign(
				{},
				...map(
					(x) =>
						isTemplateRef(x)
							? templateDecl(specs, x)
							: isAssignment(x)
							? varDecl(x)
							: specs.classes[x],
					ids
				)
			);
			if ("__user" in obj) delete obj.__user;
			curr.push(obj);
		}
		parent.push(curr);
		parent = curr;
	}
	return root[0];
};

const parseMediaQueryToken = (token: string, mediaQueries: Set<string>) => {
	if (/^::?/.test(token)) return { token };
	const idx = token.lastIndexOf(QUERY_SEP);
	if (idx < 0) return { token };
	const query = token.substring(0, idx);
	const parts = query.split(QUERY_SEP);
	if (!parts.every((x) => mediaQueries.has(x)))
		illegalArgs(`invalid media query in token: ${token}`);
	return { token: token.substring(idx + 1), query };
};

/**
 * Takes an object of media query definitions and a query ID (possibly composed
 * of multiple media query IDs, separated by `:`). Splits the query ID into
 * components, looks up definition for each sub-query ID and returns merged
 * media query definition.
 *
 * @remarks
 * See
 * [`at_media()`](https://docs.thi.ng/umbrella/hiccup-css/functions/at_media.html)
 * for details
 *
 * @param mediaQueryDefs
 * @param query
 * @returns
 */
const mergeMediaQueries = (mediaQueryDefs: IObjectOf<any>, query: string) =>
	query
		.split(QUERY_SEP)
		.reduce((acc, id) => Object.assign(acc, mediaQueryDefs[id]), <any>{});

const addMediaQueryDef = (
	mediaQueryRules: IObjectOf<IObjectOf<Set<string>>>,
	query: string,
	path: string,
	id: string
) => {
	if (!mediaQueryRules[query]) mediaQueryRules[query] = {};
	(
		mediaQueryRules[query][path] ||
		(mediaQueryRules[query][path] = new Set())
	).add(id);
};

const addPlainDef = (
	plainRules: IObjectOf<Set<string>>,
	path: string,
	id: string
) => (plainRules[path] || (plainRules[path] = new Set())).add(id);

const varDecl = (id: string): IObjectOf<any> => {
	const idx = id.indexOf("=");
	return { [`--${id.substring(0, idx)}`]: id.substring(idx + 1) };
};

const templateDecl = (specs: CompiledSpecs, id: string): IObjectOf<any> => {
	const idx = id.indexOf("(");
	const tplID = id.substring(0, idx);
	const vals = id
		.substring(idx + 1, id.length - 1)
		.split(",")
		.map((x) => x.trim());
	const spec = specs.templates[tplID];
	if (vals.length !== spec.__arity)
		illegalArgs(`template "${tplID}" expected ${spec.__arity} arguments`);
	return Object.entries(spec).reduce((acc, [k, v]) => {
		if (!k.startsWith("__")) {
			k = interpolate(k, ...vals);
			if (isString(v)) v = interpolate(v, ...vals);
			acc[k] = v;
		}
		return acc;
	}, <IObjectOf<any>>{});
};

const isAssignment = (x: string) => x.includes("=");

const isTemplateRef = (x: string) => x.includes("(");
