import { Match, Matcher, RES_PARTIAL, SeqCallback } from "./api.js";
import { result } from "./result.js";

/**
 * Takes an array of matchers and returns new matcher which applies them
 * in sequence. If any of the given matchers fails, returns
 * `Match.FAIL`.
 *
 * @param matches - child matchers
 * @param success - success callback
 * @param fail - failure callback
 */
export const seq =
    <T, C, R>(
        matches: Matcher<T, C, R>[],
        success?: SeqCallback<T, C, R>,
        fail?: SeqCallback<T, C, R>
    ): Matcher<T, C, R> =>
    () => {
        let i = 0;
        let m = matches[i]();
        const n = matches.length - 1;
        const buf: T[] = [];
        return (ctx, x) => {
            if (i > n) return result(fail && fail(ctx, buf), Match.FAIL);
            success && buf.push(x);
            while (i <= n) {
                const { type } = m(ctx, x);
                if (type >= Match.FULL) {
                    if (i === n) {
                        return result(success && success(ctx, buf));
                    }
                    m = matches[++i]();
                    if (type === Match.FULL_NC) {
                        continue;
                    }
                }
                return type === Match.FAIL
                    ? result(fail && fail(ctx, buf), Match.FAIL)
                    : RES_PARTIAL;
            }
            return result(fail && fail(ctx, buf), Match.FAIL);
        };
    };
