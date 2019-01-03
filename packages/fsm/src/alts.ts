import {
    Match,
    Matcher,
    RES_FAIL,
    RES_PARTIAL,
    ResultBody
} from "./api";
import { success } from "./success";

/**
 * Returns a composed matcher which applies inputs to all given child
 * matchers (`opts`) until either all have failed or one of them returns
 * a full match. If successful, calls `callback` with the context, the
 * child matcher's result and an array of all processed inputs thus far.
 * The result of `alts` is the result of this callback (else undefined).
 * Matchers are always processed in reverse order.
 *
 * If none of the matchers succeeded the optional `fallback` callback
 * will be executed and given a chance to produce a state transition.
 *
 * @param opts
 * @param fallback
 * @param callback
 */
export const alts = <T, C, R>(
    opts: Matcher<T, C, R>[],
    fallback?: (ctx: C, buf: T[]) => ResultBody<R>,
    callback?: (ctx: C, next: ResultBody<R>, buf: T[]) => ResultBody<R>
): Matcher<T, C, R> =>
    () => {
        const alts = opts.map((o) => o());
        const buf: T[] = [];
        return (ctx, x) => {
            for (let i = alts.length; --i >= 0;) {
                const next = alts[i](ctx, x);
                if (next.type >= Match.FULL) {
                    return callback ?
                        success(callback(ctx, next.body, buf), next.type) :
                        next;
                } else if (next.type === Match.FAIL) {
                    alts.splice(i, 1);
                }
            }
            fallback && buf.push(x);
            return alts.length ?
                RES_PARTIAL :
                fallback ?
                    success(fallback(ctx, buf)) :
                    RES_FAIL;
        };
    };
