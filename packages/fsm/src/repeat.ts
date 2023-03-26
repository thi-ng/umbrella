import { Match, RES_PARTIAL, type Matcher, type SeqCallback } from "./api.js";
import { result } from "./result.js";

/**
 * Takes a matcher and `min` / `max` repeats. Returns new matcher which
 * only returns `Match.FULL` if `match` succeeded at least `min` times
 * or once `max` repetitions have been found.
 *
 * @param match - matcher
 * @param min -min repetitions
 * @param max - max repetitions
 * @param success - success callback
 * @param fail - failure callback
 */
export const repeat =
	<T, C, R>(
		match: Matcher<T, C, R>,
		min: number,
		max: number,
		success?: SeqCallback<T, C, R>,
		fail?: SeqCallback<T, C, R>
	): Matcher<T, C, R> =>
	() => {
		let m = match();
		let i = 0;
		const buf: T[] = [];
		return (ctx, x) => {
			buf.push(x);
			const r = m(ctx, x);
			if (r.type === Match.FULL) {
				i++;
				if (i === max) {
					return result(success && success(ctx, buf));
				}
				m = match();
				return RES_PARTIAL;
			} else if (r.type === Match.FAIL) {
				if (i >= min) {
					buf.pop();
					return result(success && success(ctx, buf), Match.FULL_NC);
				} else {
					return result(fail && fail(ctx, buf), Match.FAIL);
				}
			}
			return r;
		};
	};
