import {
    Match,
    Matcher,
    RES_FAIL,
    RES_PARTIAL,
    ResultBody
} from "./api";
import { success } from "./success";

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
                if (next.type === Match.FULL) {
                    return callback ?
                        success(callback(ctx, next.body, buf)) :
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
