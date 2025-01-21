import type { Fn2, Maybe } from "@thi.ng/api";
import type { Parser, Scope, Ctx } from "../api.js";

export const xform =
	(parser: Parser, xf: Fn2<Scope, Ctx, Maybe<Scope>>): Parser =>
	(ctx) => {
		if (parser(ctx)) {
			const children = ctx.curr.children;
			const scope = children?.[children.length - 1];
			if (scope && !xf(scope, ctx)) children.pop();
			return true;
		}
		return false;
	};
