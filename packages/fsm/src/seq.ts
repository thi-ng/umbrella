import {
    Match,
    Matcher,
    RES_FAIL,
    RES_PARTIAL,
    SeqCallback
} from "./api";
import { result } from "./result";

/**
 * Takes an array of matchers and returns new matcher which applies them
 * in sequence. If any of the given matchers fails, returns
 * `Match.FAIL`.
 *
 * @param matches
 * @param callback
 */
export const seq = <T, C, R>(
    matches: Matcher<T, C, R>[],
    callback?: SeqCallback<T, C, R>
): Matcher<T, C, R> =>
    () => {
        let i = 0;
        let m = matches[i]();
        const n = matches.length - 1;
        const buf: T[] = [];
        return (state, x) => {
            if (i > n) return RES_FAIL;
            callback && buf.push(x);
            while (i <= n) {
                const { type } = m(state, x);
                if (type >= Match.FULL) {
                    if (i === n) {
                        return result(callback && callback(state, buf));
                    }
                    m = matches[++i]();
                    if (type === Match.FULL_NC) {
                        continue;
                    }
                }
                return type === Match.FAIL ?
                    RES_FAIL :
                    RES_PARTIAL;
            }
            return RES_FAIL;
        }
    };
