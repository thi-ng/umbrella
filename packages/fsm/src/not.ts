import {
    Match,
    Matcher,
    RES_FAIL,
    RES_PARTIAL,
    SeqCallback
} from "./api";
import { result } from "./result";

/**
 * Takes an existing matcher `match` and returns new matcher which
 * inverts the result of `match`. I.e. If `match` returns `Match.FULL`,
 * the new matcher returns `Match.FAIL` and vice versa. `Match.PARTIAL`
 * results remain as is.
 *
 * @param match
 * @param callback
 */
export const not = <T, C, R>(
    match: Matcher<T, C, R>,
    callback?: SeqCallback<T, C, R>
): Matcher<T, C, R> =>
    () => {
        let m = match();
        const buf: T[] = [];
        return (ctx, x) => {
            buf.push(x);
            const { type } = m(ctx, x);
            return type === Match.FAIL ?
                result(callback && callback(ctx, buf)) :
                type !== Match.PARTIAL ?
                    // TODO Match.FULL_NC handling?
                    RES_FAIL :
                    RES_PARTIAL;
        }
    };
