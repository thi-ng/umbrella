import { LitCallback, Matcher, RES_PARTIAL } from "./api";
import { result } from "./result";

/**
 * String only. Returns a matcher which consumes input until the given
 * string could be matched. If successful, calls `callback` with string
 * recorded so far (excluding the matched terminator string) and returns
 * `Match.FULL` result. Else `Match.PARTIAL`.
 *
 * @param str
 * @param callback
 */
export const until = <C, R>(
    str: string,
    callback?: LitCallback<string, C, R>
): Matcher<string, C, R> =>
    () => {
        let buf = "";
        return (ctx, x) => {
            buf += x;
            return buf.endsWith(str) ?
                result(callback && callback(ctx, buf.substr(0, buf.length - str.length))) :
                RES_PARTIAL;
        };
    };
