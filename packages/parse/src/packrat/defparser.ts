import type { Fn } from "@thi.ng/api";
import {
	FAIL,
	type Ctx,
	type Parser,
	type ParserOpts,
	type Scope,
} from "./api.js";
import { addChild, useMemoized } from "./context.js";
import { nextID } from "./utils.js";

export const defParser =
	(
		parser: Fn<Ctx, { res: boolean; next: number; scope?: Scope }>,
		{
			key = nextID(),
			memoize = true,
			discard = false,
			onFail,
		}: Pick<ParserOpts, "key" | "memoize" | "discard" | "onFail"> = {}
	): Parser =>
	(ctx) => {
		const {
			curr: { pos },
			cache,
			src,
		} = ctx;
		if (pos >= src.length) return false;
		memoize &&= ctx.memoize;
		if (memoize) {
			const memo = cache[pos]?.get(key);
			if (memo) return useMemoized(ctx, memo, key, discard);
		}
		const { res, next, scope } = parser(ctx);
		if (!res) {
			onFail?.(next, ctx);
			if (memoize) {
				ctx.cache[pos]?.set(key, FAIL) ??
					(ctx.cache[pos] = new Map([[key, FAIL]]));
			}
			return false;
		} else {
			if (memoize) {
				const entry = { scope: scope!, next };
				cache[pos]?.set(key, entry) ??
					(cache[pos] = new Map([[key, entry]]));
			}
			if (scope) {
				if (!discard) {
					addChild(ctx.curr, scope);
				}
				ctx.curr.pos = next;
				// if (ctx.prune) prune(ctx);
			}
			return true;
		}
	};
