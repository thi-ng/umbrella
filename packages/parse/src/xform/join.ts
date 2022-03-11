import type { Nullable } from "@thi.ng/api";
import type { Parser, ParseScope } from "../api.js";
import { xform } from "../combinators/xform.js";

/**
 * Recursively joins non-null results of all children into a single
 * string, then discards children. Also see {@link join}.
 *
 * @param scope - 
 */
export const xfJoin = <T>(scope: Nullable<ParseScope<T>>) => {
    if (!scope || !scope.children) return null;
    const res = [];
    for (let c of scope.children) {
        xfJoin(c);
        if (c.result) res.push(c.result);
    }
    scope.result = res.join("");
    scope.children = null;
    return scope;
};

/**
 * Syntax sugar for `xform(parser, xfJoin)`.
 *
 * @param parser - 
 */
export const join = <T>(parser: Parser<T>) => xform(parser, xfJoin);
