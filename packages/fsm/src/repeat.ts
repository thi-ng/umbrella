import {
    Match,
    Matcher,
    RES_PARTIAL,
    SeqCallback
} from "./api";
import { success } from "./success";

export const repeat = <T, C, R>(
    match: Matcher<T, C, R>,
    min: number,
    max: number,
    callback?: SeqCallback<T, C, R>
): Matcher<T, C, R> =>
    () => {
        let m = match();
        let i = 0;
        const buf: T[] = [];
        return (ctx, x) => {
            buf.push(x);
            const r = m(ctx, x);
            if (r.type === Match.FULL) {
                i++;
                if (i === max) {
                    return success(callback && callback(ctx, buf));
                }
                m = match();
                return RES_PARTIAL;
            } else if (r.type === Match.FAIL) {
                if (i >= min) {
                    buf.pop();
                    return success(callback && callback(ctx, buf), Match.FULL_NC);
                }
            }
            return r;
        };
    };
