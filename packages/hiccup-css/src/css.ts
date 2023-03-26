import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isNotStringAndIterable } from "@thi.ng/checks/is-not-string-iterable";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { COMPACT, DEFAULT_VENDORS, type CSSOpts } from "./api.js";
import { expand, formatDecls } from "./impl.js";

export const css = (rules: any, opts?: Partial<CSSOpts>) => {
	opts = {
		format: COMPACT,
		vendors: DEFAULT_VENDORS,
		fns: {},
		depth: 0,
		...opts,
	};
	isArray(opts.autoprefix) && (opts.autoprefix = new Set(opts.autoprefix));
	return isPlainObject(rules)
		? formatDecls(rules, <CSSOpts>opts)
		: isFunction(rules)
		? rules([], <CSSOpts>opts).join(opts.format!.rules)
		: expand(
				[],
				[],
				isArray(rules)
					? rules
					: isNotStringAndIterable(rules)
					? [...rules]
					: illegalArgs(`invalid rules`),
				<CSSOpts>opts
		  ).join(opts.format!.rules);
};
