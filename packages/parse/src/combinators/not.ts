import type { Parser } from "../api.js";
import { always } from "../prims/always.js";

/**
 * Runs `parser`, discards its result and if it passed returns false,
 * else runs `fail` parser and returns its result. By default `fail` is
 * using {@link always}, which consumes a single character and always
 * succeeds. To avoid consuming a character on first `parser`'s failure,
 * use {@link pass} or {@link passD} instead.
 *
 * @param parser -
 * @param fail -
 */
export const not =
	<T>(parser: Parser<T>, fail: Parser<T> = always()): Parser<T> =>
	(ctx) => {
		if (ctx.done) return false;
		ctx.start("");
		const res = parser(ctx);
		ctx.discard();
		return res ? false : fail(ctx);
	};
