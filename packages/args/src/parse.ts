// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf, Maybe, Nullable } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { defError } from "@thi.ng/errors/deferror";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { camel } from "@thi.ng/strings/case";
import type { ArgSpecExt, Args, ParseOpts, ParseResult } from "./api.js";
import { usage } from "./usage.js";
import { __ansi, __colorTheme } from "./utils.js";

export const ParseError = defError(() => "parse error");

export const parse = <T extends IObjectOf<any>>(
	specs: Args<T>,
	argv: string[],
	opts?: Partial<ParseOpts>
): Maybe<ParseResult<T>> => {
	opts = { start: 2, showUsage: true, help: ["--help", "-h"], ...opts };
	try {
		return __parseOpts(specs, argv, opts);
	} catch (e) {
		if (opts.showUsage) {
			console.log(
				__ansi(
					(<Error>e).message,
					__colorTheme(opts.usageOpts?.color).error
				) +
					"\n\n" +
					usage(specs, opts.usageOpts)
			);
		}
		throw new ParseError((<Error>e).message);
	}
};

/** @internal */
const __parseOpts = <T extends IObjectOf<any>>(
	specs: Args<T>,
	argv: string[],
	opts: Partial<ParseOpts>
): Maybe<ParseResult<T>> => {
	const aliases = __aliasIndex<T>(specs);
	const acc: any = {};
	let id: Nullable<string>;
	let spec: Nullable<ArgSpecExt>;
	let i = opts.start!;
	for (; i < argv.length; ) {
		const a = argv[i];
		if (!id) {
			if (opts.help!.includes(a)) {
				console.log(usage(specs, opts.usageOpts));
				return;
			}
			const state = __parseKey(specs, aliases, acc, a);
			id = state.id;
			spec = state.spec;
			i = i + ~~(state.state < 2);
			if (state.state) break;
		} else {
			if (__parseValue(spec!, acc, id, a)) break;
			id = null;
			i++;
		}
	}
	id && illegalArgs(`missing value for: --${id}`);
	return {
		result: __processResults(specs, acc),
		index: i,
		rest: argv.slice(i),
		done: i >= argv.length,
	};
};

/** @internal */
const __aliasIndex = <T extends IObjectOf<any>>(specs: Args<T>) =>
	Object.entries(specs).reduce(
		(acc, [k, v]) => (v.alias ? ((acc[v.alias] = k), acc) : acc),
		<IObjectOf<string>>{}
	);

interface ParseKeyResult {
	state: number;
	id?: string;
	spec?: ArgSpecExt;
}

/** @internal */
const __parseKey = <T extends IObjectOf<any>>(
	specs: Args<T>,
	aliases: IObjectOf<string>,
	acc: any,
	a: string
): ParseKeyResult => {
	if (a[0] === "-") {
		let id: Maybe<string>;
		if (a[1] === "-") {
			// terminator arg, stop parsing
			if (a === "--") return { state: 1 };
			id = camel(a.substring(2));
		} else {
			id = aliases[a.substring(1)];
			!id && illegalArgs(`unknown option: ${a}`);
		}
		const spec: ArgSpecExt = specs[id];
		!spec && illegalArgs(id);
		if (spec.flag) {
			acc[id] = true;
			id = undefined;
			// stop parsing if fn returns false
			if (spec.fn && !spec.fn("true")) return { state: 1, spec };
		}
		return { state: 0, id, spec };
	}
	// no option arg, stop parsing
	return { state: 2 };
};

/** @internal */
const __parseValue = (spec: ArgSpecExt, acc: any, id: string, a: string) => {
	// /^-[a-z]/i.test(a) && illegalArgs(`missing value for: --${id}`);
	if (spec!.multi) {
		isArray(acc[id!]) ? acc[id!].push(a) : (acc[id!] = [a]);
	} else {
		acc[id!] = a;
	}
	return spec!.fn && !spec!.fn(a);
};

/** @internal */
const __processResults = <T extends IObjectOf<any>>(
	specs: Args<T>,
	acc: any
) => {
	let spec: Nullable<ArgSpecExt>;
	for (let id in specs) {
		spec = specs[id];
		if (acc[id] === undefined) {
			if (spec.default !== undefined) {
				acc[id] = spec.default;
			} else if (spec.optional === false) {
				illegalArgs(`missing arg: --${id}`);
			}
		} else if (spec.coerce) {
			__coerceValue(spec, acc, id);
		}
	}
	return acc;
};

/** @internal */
const __coerceValue = (spec: ArgSpecExt, acc: any, id: string) => {
	try {
		if (spec.multi && spec.delim) {
			acc[id] = (<string[]>acc[id]).reduce(
				(acc, x) => (acc.push(...x.split(spec!.delim!)), acc),
				<string[]>[]
			);
		}
		acc[id] = spec.coerce!(acc[id]);
	} catch (e) {
		throw new Error(`arg --${id}: ${(<Error>e).message}`);
	}
};
