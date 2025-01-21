import type { Predicate } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isSet } from "@thi.ng/checks/is-set";
import { isString } from "@thi.ng/checks/is-string";
import type { Discarded, ParserOptsMinMax } from "../api.js";
import { defParser } from "../defparser.js";

export const oneOfP = (
	pred: Predicate<string>,
	{
		id = "oneOf",
		key,
		discard,
		memoize,
		onFail,
		min = 1,
		max = 1,
	}: ParserOptsMinMax = {}
) =>
	defParser(
		(ctx) => {
			ctx.debug?.("oneof", id);
			const {
				curr: { pos },
				src,
			} = ctx;
			let next = pos;
			let i = 0;
			for (
				;
				i < max && next < src.length && pred(src[next]);
				i++, next++
			);
			return i < min
				? { res: false, next }
				: {
						res: true,
						next,
						scope: { id, pos, result: src.substring(pos, next) },
				  };
		},
		{ key, memoize, discard, onFail }
	);

export const oneOf = (
	match: string | string[] | Set<string> | Record<string, boolean>,
	opts?: ParserOptsMinMax
) =>
	oneOfP(
		isString(match) || isArray(match)
			? (x) => match.includes(x)
			: isSet(match)
			? (x) => match.has(x)
			: (x) => match[x],
		opts
	);

export const oneOfD = (
	match: string | string[] | Set<string> | Record<string, boolean>,
	opts?: Discarded<ParserOptsMinMax>
) => oneOf(match, { ...opts, discard: true });
