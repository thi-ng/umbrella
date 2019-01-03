import {
    Match,
    Matcher,
    RangeCallback,
    RES_PARTIAL
} from "./api";

export const until = <C, R>(
    str: string,
    callback?: RangeCallback<string, C, R>
): Matcher<string, C, R> =>
    () => {
        let buf = "";
        return (ctx, x) => {
            buf += x;
            return buf.length >= str.length &&
                buf.substr(buf.length - str.length) === str ?
                {
                    type: Match.FULL,
                    body: callback && callback(ctx, buf.substr(0, buf.length - str.length))
                } :
                RES_PARTIAL;
        };
    };
