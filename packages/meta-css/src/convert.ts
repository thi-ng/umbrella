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
	type CSSOpts,
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
	ARG_SCOPE,
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
	withoutInternals,
} from "./utils.js";

type State = "sel" | "class" | "nest";

export interface ConvertOpts extends CommonOpts {
	bundle: boolean;
	eval?: string;
	force?: string[];
	include?: string[];
	noDecls: boolean;
	noHeader: boolean;
	noWrite: boolean;
	out?: string;
	pretty: boolean;
	scope?: string;
	specs: string;
	watch: boolean;
}

/** @internal */
interface Scope {
	state: State;
	sel: string[];
	path: string;
	parent?: Scope;
}

/** @internal */
interface ProcessCtx {
	root: Scope;
	curr: Scope;
	scopes: Scope[];
}

export interface ProcessOpts {
	css: Partial<CSSOpts>;
	logger: ILogger;
	mediaQueryIDs: Set<string>;
	mediaQueryRules: IObjectOf<IObjectOf<Set<string>>>;
	plainRules: IObjectOf<Set<string>>;
	specs: CompiledSpecs;
}

export const CONVERT: Command<ConvertOpts, CommonOpts, AppCtx<ConvertOpts>> = {
	desc: "Transpile (and optionally bundle) meta stylesheets to CSS",
	opts: {
		...ARG_BUNDLE,
		...ARG_EVAL,
		...ARG_FORCE_INCLUDE,
		...ARG_INCLUDE,
		...ARG_NO_DECLS,
		...ARG_NO_HEADER,
		...ARG_OUTPUT,
		...ARG_PRETTY,
		...ARG_SCOPE,
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
			await __watchBundleInputs(ctx, forceRules);
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
			await __watchInputs(ctx, specs, forceRules);
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

/** @internal */
const __watchInputs = async (
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

/** @internal */
const __watchBundleInputs = async (
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
		opts: { include, noDecls, noHeader, pretty, scope },
	}: Pick<AppCtx<Omit<ConvertOpts, "noWrite">>, "logger" | "opts">,
	specs: CompiledSpecs,
	forceRules: ReturnType<typeof processForceIncludes>,
	inputs: string[],
	out?: string
) => {
	const procOpts: ProcessOpts = {
		logger,
		specs,
		css: { format: pretty ? PRETTY : COMPACT, fns: QUOTED_FNS, scope },
		mediaQueryIDs: new Set(Object.keys(specs.media)),
		mediaQueryRules: { ...forceRules.mediaQueryRules },
		plainRules: { ...forceRules.plainRules },
	};
	const bundle: string[] = include
		? include.map((x) => readText(resolve(x), logger).trim())
		: [];
	if (!noHeader) bundle.push(generateHeader(specs));
	if (!noDecls && specs.decls.length) {
		bundle.push(css(specs.decls, procOpts.css));
	}
	inputs.forEach((input) => processSpec(input, procOpts));
	processPlainRules(bundle, procOpts);
	processMediaQueries(bundle, procOpts);
	maybeWriteText(out, bundle, logger);
};

export const processMediaQueries = (
	result: string[],
	{ css: opts, logger, mediaQueryRules, specs }: ProcessOpts
) => {
	for (let queryID in mediaQueryRules) {
		const rules = __buildDecls(mediaQueryRules[queryID], specs);
		logger.debug("mediaquery rules", queryID, rules);
		result.push(
			css(
				at_media(__mergeMediaQueries(specs.media, queryID), rules),
				opts
			)
		);
	}
};

export const processPlainRules = (
	bundle: string[],
	{ css: opts, logger, plainRules, specs }: ProcessOpts
) => {
	const rules = __buildDecls(plainRules, specs);
	logger.debug("plain rules", rules);
	bundle.push(css(rules, opts));
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
		const { token, query } = __parseMediaQueryToken(id, mediaQueryIDs);
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
				? __addMediaQueryDef(mediaQueryRules, query, `.${match}`, match)
				: __addPlainDef(plainRules, `.${match}`, match);
		}
	}
	return { mediaQueryRules, plainRules };
};

export const processSpec = (
	src: string,
	{ specs, mediaQueryIDs, mediaQueryRules, plainRules }: ProcessOpts
) => {
	const root = __defScope();
	const initial = __defScope(root);
	const ctx: ProcessCtx = {
		root,
		curr: initial,
		scopes: [initial],
	};

	// process line by line, skip comment lines
	for (let line of split(src)) {
		if (!line || /^\s*\/\//.test(line)) continue;
		for (let token of splitLine(line)) {
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
							$scope.path = __buildScopePath(ctx.scopes);
						}
						$scope.state = "class";
					} else if (token === "}") {
						__endScope(ctx);
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
						ctx.scopes.push((ctx.curr = __defScope($scope)));
					} else if (token === "}") {
						__endScope(ctx);
					} else {
						let { token: id, query } = __parseMediaQueryToken(
							token,
							mediaQueryIDs
						);
						if (
							!specs.classes[id] &&
							!(
								__isAssignment(id) ||
								__isVerbatimProp(id) ||
								__isTemplateRef(id)
							)
						)
							illegalArgs(`unknown class ID: ${id}`);
						if (query) {
							__addMediaQueryDef(
								mediaQueryRules,
								query,
								$scope.path,
								id
							);
						} else {
							__addPlainDef(plainRules, $scope.path, id);
						}
					}
					break;
				default:
					illegalState($scope.state);
			}
		}
	}
};

/** @internal */
export function* splitLine(line: string) {
	let from = -1;
	let end = line.length;
	let depth = 0;
	let args = 0;
	for (let i = 0; i < end; i++) {
		const c = line[i];
		if (c === " " || c === "\t") {
			if (!(depth || args) && from >= 0) {
				yield line.substring(from, i);
				from = -1;
			}
		} else if (c === "{" || c === "}") {
			if (from >= 0) yield line.substring(from, i);
			yield c;
			from = -1;
		} else if (c === "(") {
			depth++;
		} else if (c === ")") {
			if (--depth < 0) illegalArgs(`invalid nesting in line: '${line}'`);
		} else if (c === "[") {
			if (from < 0) from = i;
			args++;
		} else if (c === "]") {
			if (--args < 0)
				illegalArgs(`invalid arg nesting in line: '${line}'`);
		} else if (from < 0) {
			from = i;
		}
	}
	if (depth) illegalArgs("template calls must be fully on a single line");
	if (args) illegalArgs("verbatim properties must be fully on a single line");
	if (from >= 0) yield line.substring(from, end);
}

const QUERY_SEP = ":";
const PATH_SEP = "///";

/** @internal */
const __defScope = (parent?: Scope): Scope => ({
	state: "sel",
	sel: parent ? [] : ["<root>"],
	path: "",
	parent,
});

/** @internal */
const __endScope = (ctx: ProcessCtx) => {
	const isEmpty = !ctx.curr.sel.length;
	assert(!!ctx.curr.parent, "stack underflow");
	ctx.scopes.pop();
	if (ctx.scopes.length > 0) {
		ctx.curr = peek(ctx.scopes);
		if (!isEmpty && ctx.curr.state === "nest") {
			ctx.scopes.push((ctx.curr = __defScope(ctx.curr)));
		}
	} else {
		ctx.scopes.push((ctx.curr = __defScope(ctx.root)));
	}
};

/** @internal */
const __buildScopePath = (scopes: Scope[]) =>
	scopes.map((x) => x.sel.join(",")).join(PATH_SEP);

/** @internal */
const __buildDecls = (rules: IObjectOf<Set<string>>, specs: CompiledSpecs) =>
	Object.entries(rules).map(([path, ids]) =>
		__buildDeclsForPath(path, ids, specs)
	);

/** @internal */
const __buildDeclsForPath = (
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
						__isVerbatimProp(x)
							? __verbatimPropDecl(x)
							: __isAssignment(x)
							? __varDecl(x)
							: __isTemplateRef(x)
							? __templateDecl(specs, x)
							: withoutInternals(specs.classes[x]),
					ids
				)
			);
			curr.push(obj);
		}
		parent.push(curr);
		parent = curr;
	}
	return root[0];
};

/** @internal */
const __parseMediaQueryToken = (token: string, mediaQueries: Set<string>) => {
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
 *
 * @internal
 */
const __mergeMediaQueries = (mediaQueryDefs: IObjectOf<any>, query: string) =>
	query
		.split(QUERY_SEP)
		.reduce((acc, id) => Object.assign(acc, mediaQueryDefs[id]), <any>{});

/** @internal */
const __addMediaQueryDef = (
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

/** @internal */
const __addPlainDef = (
	plainRules: IObjectOf<Set<string>>,
	path: string,
	id: string
) => (plainRules[path] || (plainRules[path] = new Set())).add(id);

/** @internal */
const __varDecl = (id: string): IObjectOf<any> => {
	const idx = id.indexOf("=");
	return { [`--${id.substring(0, idx)}`]: id.substring(idx + 1) };
};

/** @internal */
const __templateDecl = (specs: CompiledSpecs, id: string): IObjectOf<any> => {
	const idx = id.indexOf("(");
	const tplID = id.substring(0, idx);
	const vals = id
		.substring(idx + 1, id.length - 1)
		.split(/(?<!\\),/g)
		.map((x) => x.trim().replace("\\,", ","));
	const spec = specs.templates[tplID];
	if (!spec) illegalArgs(`unknown template: ${tplID}`);
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

/** @internal */
const __verbatimPropDecl = (src: string) => {
	const [_, id, value] = /^(.+)-\[(.+)\]/.exec(src)!;
	return { [id]: value };
};

/** @internal */
const __isAssignment = (x: string) => x.includes("=");

/** @internal */
const __isTemplateRef = (x: string) => x.includes("(");

/** @internal */
const __isVerbatimProp = (x: string) => x.indexOf("-[") > 0 && x.endsWith("]");
