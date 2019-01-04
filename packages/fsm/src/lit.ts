import { Predicate2 } from "@thi.ng/api";
import { equiv as _equiv } from "@thi.ng/equiv";
import {
    Matcher,
    RES_FAIL,
    RES_PARTIAL,
    SeqCallback
} from "./api";
import { result } from "./result";

export const lit = <T, C, R>(
    match: T[],
    callback?: SeqCallback<T, C, R>,
    equiv: Predicate2<T> = _equiv
): Matcher<T, C, R> =>
    () => {
        const buf: T[] = [];
        const n = match.length;
        let i = 0;
        return (state, x) =>
            equiv((buf.push(x), x), match[i++]) ?
                i === n ?
                    result(callback && callback(state, buf)) :
                    RES_PARTIAL :
                RES_FAIL;
    };
