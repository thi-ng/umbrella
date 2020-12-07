import type { Predicate2 } from "@thi.ng/api";
import { equiv as _equiv } from "@thi.ng/equiv";
import { Match, Matcher, RES_PARTIAL, SeqCallback } from "./api";
import { result } from "./result";

export const lit = <T, C, R>(
    match: T[],
    success?: SeqCallback<T, C, R>,
    fail?: SeqCallback<T, C, R>,
    equiv: Predicate2<T> = _equiv
): Matcher<T, C, R> => () => {
    const buf: T[] = [];
    const n = match.length;
    let i = 0;
    return (ctx, x) =>
        equiv((buf.push(x), x), match[i++])
            ? i === n
                ? result(success && success(ctx, buf))
                : RES_PARTIAL
            : result(fail && fail(ctx, buf), Match.FAIL);
};
