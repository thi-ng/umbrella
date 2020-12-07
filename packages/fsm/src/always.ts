import type { LitCallback, Matcher } from "./api";
import { result } from "./result";

/**
 * Returns a matcher which always succeeds (produces a `Match.FULL` result) for
 * any given input. Use `never()` for the opposite effect.
 *
 * @param callback -
 */
export const always = <T, C, R>(
    callback?: LitCallback<T, C, R>
): Matcher<T, C, R> => () => (ctx, x) => result(callback && callback(ctx, x));
