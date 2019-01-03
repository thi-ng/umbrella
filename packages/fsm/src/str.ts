import {
    Matcher,
    RangeCallback,
    RES_FAIL,
    RES_PARTIAL
} from "./api";
import { success } from "./success";

export const str = <C, R>(
    str: string,
    callback?: RangeCallback<string, C, R>
): Matcher<string, C, R> =>
    () => {
        let buf = "";
        return (state, x) =>
            buf.length >= str.length ?
                RES_FAIL :
                (buf += x) === str ?
                    success(callback && callback(state, buf)) :
                    str.indexOf(buf) === 0 ?
                        RES_PARTIAL :
                        RES_FAIL;
    };
