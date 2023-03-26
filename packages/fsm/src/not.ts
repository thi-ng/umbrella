import { Match, RES_PARTIAL, type Matcher, type SeqCallback } from "./api.js";
import { result } from "./result.js";

/**
 * Takes an existing matcher `match` and returns new matcher which
 * inverts the result of `match`. I.e. If `match` returns `Match.FULL`,
 * the new matcher returns `Match.FAIL` and vice versa. `Match.PARTIAL`
 * results remain as is.
 *
 * @param match - matcher to invert
 * @param success - success callback
 * @param fail - failure callback
 */
export const not =
	<T, C, R>(
		match: Matcher<T, C, R>,
		success?: SeqCallback<T, C, R>,
		fail?: SeqCallback<T, C, R>
	): Matcher<T, C, R> =>
	() => {
		let m = match();
		const buf: T[] = [];
		return (ctx, x) => {
			buf.push(x);
			const { type } = m(ctx, x);
			return type === Match.FAIL
				? result(success && success(ctx, buf))
				: type !== Match.PARTIAL
				? // TODO Match.FULL_NC handling?
				  result(fail && fail(ctx, buf), Match.FAIL)
				: RES_PARTIAL;
		};
	};
