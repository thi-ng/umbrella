import type { Parser, ParserOpts, ParserOptsMinMax, Scope } from "../api.js";
import { defParser } from "../defparser.js";

export const repeat = (
	parser: Parser,
	{
		id = "repeat",
		key,
		discard,
		memoize,
		onFail,
		min = 1,
		max = Infinity,
	}: ParserOptsMinMax = {}
) =>
	defParser(
		(ctx) => {
			ctx.debug?.("repeat", id);
			const { curr, src } = ctx;
			const pos = curr.pos;
			const $curr: Scope = { id, pos };
			ctx.curr = $curr;
			let i = 0;
			for (; i < max && $curr.pos < src.length && parser(ctx); i++);
			ctx.curr = curr;
			return i < min
				? { res: false, next: $curr.pos }
				: { res: true, next: $curr.pos, scope: { ...$curr, pos } };
		},
		{ key, discard, memoize, onFail }
	);

export const zeroOrMore = (parser: Parser, opts?: ParserOpts) =>
	repeat(parser, { ...opts, min: 0, max: Infinity });

export const oneOrMore = (parser: Parser, opts?: ParserOpts) =>
	repeat(parser, { ...opts, min: 0, max: Infinity });
