import type { IObjectOf } from "@thi.ng/api";
import { flag, string, strings, type Command } from "@thi.ng/args";
import { peek } from "@thi.ng/arrays";
import { illegalArgs, illegalState } from "@thi.ng/errors";
import { readText } from "@thi.ng/file-io";
import {
	COMPACT,
	PRETTY,
	at_media,
	css,
	type Format,
} from "@thi.ng/hiccup-css";
import { type ILogger } from "@thi.ng/logger";
import { camel } from "@thi.ng/strings";
import { basename, resolve } from "path";
import type { AppCtx, CommonOpts } from "./api.js";
import { maybeWriteText } from "./utils.js";

type State = "sel" | "class" | "nest";

interface ConvertOpts extends CommonOpts {
	specs: string;
	include?: string[];
	pretty: boolean;
	noHeader: boolean;
}

interface Scope {
	state: State;
	decl: any[];
	props: IObjectOf<any>;
	sel: string[];
	path: string;
	parent?: Scope;
}

interface ProcessCtx {
	root: Scope;
	curr: Scope;
	scopes: Scope[];
}

interface ProcessOpts {
	logger: ILogger;
	format: Format;
	outDir: string;
	include?: string[];
	noHeader: boolean;
	specs: CompiledSpecs;
}

interface CompiledSpecs {
	__MEDIA_QUERIES__: IObjectOf<any>;
	[id: string]: IObjectOf<any>;
}

export const CONVERT: Command<ConvertOpts, CommonOpts, AppCtx<ConvertOpts>> = {
	desc: "Convert meta declarations to CSS",
	opts: {
		specs: string({ alias: "s", optional: false, desc: "Specs dir" }),
		include: strings({
			alias: "I",
			desc: "Include CSS files (only in 1st input)",
		}),
		pretty: flag({ alias: "p", default: false, desc: "Pretty print CSS" }),
		noHeader: flag({
			default: false,
			desc: "Don't emit generated header comment",
		}),
	},
	fn: async ({
		logger,
		opts: { specs, out, pretty, noHeader, include },
		inputs,
	}) => {
		const specDir = resolve(specs);
		const format = pretty ? PRETTY : COMPACT;
		logger.debug("importing specs:", specDir);
		const module = await import(specDir);
		await Promise.all(
			inputs.map((file, i) =>
				processFile(resolve(file), {
					logger,
					specs: module,
					outDir: out,
					format,
					noHeader,
					include: i === 0 ? include : undefined,
				})
			)
		);
	},
};

const QUERY_SEP = ":";

const PATH_SEP = "///";

const defScope = (parent?: Scope): Scope => ({
	state: "sel",
	decl: [],
	sel: parent ? [] : ["<root>"],
	props: {},
	path: "",
	parent,
});

const endScope = (ctx: ProcessCtx) => {
	const isEmpty = !ctx.curr.sel.length;
	if (ctx.curr.parent) {
		if (!isEmpty) ctx.curr.parent.decl.push(ctx.curr.decl);
	} else {
		illegalState("stack underflow");
	}
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

const buildDecls = (selectorPath: string, ids: string[], specs: any) => {
	const root: any[] = [];
	let parent = root;
	const levels = selectorPath.split(PATH_SEP);
	for (let i = 0; i < levels.length; i++) {
		const curr = levels[i].split(",");
		if (i == levels.length - 1) {
			curr.push(Object.assign({}, ...ids.map((x) => specs[x])));
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

const processFile = (
	path: string,
	{ logger, format, specs, outDir, noHeader, include }: ProcessOpts
) => {
	const root = defScope();
	const initial = defScope(root);
	const ctx: ProcessCtx = {
		root,
		curr: initial,
		scopes: [initial],
	};

	const mediaQueryIDs = new Set(Object.keys(specs.__MEDIA_QUERIES__));
	let mediaQueryRules: IObjectOf<Record<string, string[]>> = {};

	for (let token of readText(path, logger).split(/\s+/)) {
		let $scope = ctx.curr;
		switch ($scope.state) {
			case "sel":
			case "nest":
				if (token === "{") {
					if ($scope.state === "sel") {
						$scope.sel = $scope.sel.map((x) => x.replace(",", ""));
						$scope.decl = [...$scope.sel, $scope.props];
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
					let { token: $token, query } = parseMediaQueryToken(
						token,
						mediaQueryIDs
					);
					const id = camel($token);
					const spec = specs[id];
					if (!spec) illegalArgs(`unknown rule: ${id}`);
					if (query) {
						if (!mediaQueryRules[query])
							mediaQueryRules[query] = {};
						const acc =
							mediaQueryRules[query][$scope.path] ||
							(mediaQueryRules[query][$scope.path] = []);
						acc.push(id);
					} else {
						Object.assign($scope.props, spec);
					}
				}
				break;
			default:
				illegalState($scope.state);
		}
	}

	logger.debug("root", root);
	logger.debug("responsives", mediaQueryRules);

	const serialized: string[] = include
		? include.map((x) => readText(resolve(x), logger).trim())
		: [];
	if (!noHeader) {
		serialized.push(
			`/*! generated by thi.ng/meta-css from ${basename(
				path
			)} @ ${new Date().toISOString()} */`
		);
	}
	serialized.push(css(root.decl, { format }));

	for (let queryID in mediaQueryRules) {
		const rules = Object.entries(mediaQueryRules[queryID]).map(
			([path, ids]) => buildDecls(path, ids, specs)
		);
		logger.debug("responsive rules", queryID, rules);
		serialized.push(
			css(
				at_media(
					mergeMediaQueries(specs.__MEDIA_QUERIES__, queryID),
					rules
				),
				{
					format,
				}
			)
		);
	}
	maybeWriteText(
		outDir,
		`/${basename(path).replace(".meta", ".css")}`,
		serialized,
		logger
	);
};
