import {
    Match,
    Matcher,
    MatcherInst,
    MatchResult,
    RES_FAIL,
    RES_PARTIAL,
    ResultBody
} from "./api";
import { result } from "./result";

/**
 * Returns a composed matcher which applies inputs to all given child
 * matchers (`opts`) until either all have failed or one of them returns
 * a full match. If successful, calls `callback` with the context, the
 * child matcher's result and an array of all processed inputs thus far.
 * The result of `alts` is the result of this callback (else undefined).
 *
 * Note: Matchers are always processed in reverse order, therefore
 * attention must be paid to the given ordering of supplied matchers.
 *
 * If none of the matchers succeed the optional `fallback` callback will
 * be executed and given a chance to produce a state transition. It too
 * will be given an array of all processed inputs thus far.
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
        let active = alts.length;
        return (ctx, x) => {
            for (let i = alts.length, a: MatcherInst<T, C, R>, next: MatchResult<R>; --i >= 0;) {
                if (!(a = alts[i])) continue;
                next = a(ctx, x);
                if (next.type >= Match.FULL) {
                    return callback ?
                        result(callback(ctx, next.body, buf), next.type) :
                        next;
                } else if (next.type === Match.FAIL) {
                    alts[i] = null;
                    active--;
                }
            }
            fallback && buf.push(x);
            return active ?
                RES_PARTIAL :
                fallback ?
                    result(fallback(ctx, buf)) :
                    RES_FAIL;
        };
    };
