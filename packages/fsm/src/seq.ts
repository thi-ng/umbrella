import {
    Match,
    Matcher,
    RES_FAIL,
    RES_PARTIAL,
    SeqCallback
} from "./api";

export const seq = <T, C, R>(
    opts: Matcher<T, C, R>[],
    callback?: SeqCallback<T, C, R>
): Matcher<T, C, R> =>
    () => {
        let i = 0;
        let o = opts[i]();
        const n = opts.length - 1;
        const buf: T[] = [];
        return (state, x) => {
            if (i > n) return RES_FAIL;
            callback && buf.push(x);
            const { type } = o(state, x);
            if (type === Match.FULL) {
                if (i === n) {
                    return {
                        type: Match.FULL,
                        body: callback && callback(state, buf)
                    };
                }
                o = opts[++i]();
            }
            return type === Match.FAIL ?
                RES_FAIL :
                RES_PARTIAL;
        }
    };
