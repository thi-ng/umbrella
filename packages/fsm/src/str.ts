import {
    LitCallback,
    Matcher,
    RES_FAIL,
    RES_PARTIAL
} from "./api";
import { result } from "./result";

/**
 * String-only version of `seq()`. Returns `Match.FULL` once the entire
 * given string could be matched.
 *
 * @param str
 * @param callback 
 */
export const str = <C, R>(
    str: string,
    callback?: LitCallback<string, C, R>
): Matcher<string, C, R> =>
    () => {
        let buf = "";
        return (state, x) =>
            (buf += x) === str ?
                result(callback && callback(state, buf)) :
                str.indexOf(buf) === 0 ?
                    RES_PARTIAL :
                    RES_FAIL;
    };
