import { Matcher, RangeCallback, RES_PARTIAL } from "./api";
import { success } from "./success";

export const until = <C, R>(
    str: string,
    callback?: RangeCallback<string, C, R>
): Matcher<string, C, R> =>
    () => {
        let buf = "";
        return (ctx, x) => {
            buf += x;
            return buf.endsWith(str) ?
                success(callback && callback(ctx, buf.substr(0, buf.length - str.length))) :
                RES_PARTIAL;
        };
    };
