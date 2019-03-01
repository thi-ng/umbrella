import { LitCallback, Match, Matcher, RES_PARTIAL } from "./api";
import { result } from "./result";

/**
 * String-only version of `seq()`. Returns `Match.FULL` once the entire
 * given string could be matched.
 *
 * @param str
 * @param success
 * @param fail
 */
export const str = <C, R>(
    str: string,
    success?: LitCallback<string, C, R>,
    fail?: LitCallback<string, C, R>
): Matcher<string, C, R> => () => {
    let buf = "";
    return (ctx, x) =>
        (buf += x) === str
            ? result(success && success(ctx, buf))
            : str.indexOf(buf) === 0
                ? RES_PARTIAL
                : result(fail && fail(ctx, buf), Match.FAIL);
};
