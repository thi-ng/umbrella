import type { Parser } from "../api.js";
import { defParser } from "../defparser.js";
import { pass } from "../prims/pass.js";

export const not = (parser: Parser, fail: Parser = pass({ discard: true })) =>
	defParser((ctx) => {
		const curr = ctx.curr;
		const $curr = { id: "", pos: curr.pos };
		ctx.curr = $curr;
		const res = parser(ctx);
		curr.pos = $curr.pos;
		ctx.curr = curr;
		if (res || !fail(ctx)) return { res: false, next: ctx.curr.pos };
		return { res: true, next: curr.pos };
	});
