import type { Fn } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import type { Ctx, Parser, ParserOpts } from "../api.js";
import { addChild } from "../context.js";
import { nextID } from "../utils.js";

export interface PassOpts extends Omit<ParserOpts, "onFail"> {
	result?: Fn<Ctx, any> | any;
}

export const pass =
	({
		id = "pass",
		key = nextID(),
		discard = false,
		memoize = true,
		result,
	}: PassOpts = {}): Parser =>
	(ctx) => {
		ctx.debug?.("pass", id, key);
		const { cache, curr } = ctx;
		const pos = curr.pos;
		memoize &&= ctx.memoize;
		const scope =
			memoize || !discard
				? {
						id,
						pos,
						result: isFunction(result) ? result(ctx) : result,
				  }
				: undefined;
		if (memoize) {
			const entry = { scope: scope!, next: pos };
			cache[pos]?.set(key, entry) ??
				(cache[pos] = new Map([[key, entry]]));
		}
		if (!discard) {
			addChild(curr, scope!);
		}
		// if (ctx.prune) prune(ctx);
		return true;
	};
