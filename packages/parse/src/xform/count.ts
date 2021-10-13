import type { Parser, ScopeTransform } from "../api.js";
import { xform } from "../combinators/xform.js";

/**
 * Stores number of children as result, then discards children. Also see
 * {@link count}.
 *
 * @param scope
 */
export const xfCount: ScopeTransform<any> = (scope) => {
    scope!.result = scope!.children ? scope!.children.length : 0;
    scope!.children = null;
    return scope;
};

/**
 * Syntax sugar for `xform(parser, xfCount)`.
 *
 * @param parser
 */
export const count = <T>(parser: Parser<T>) => xform(parser, xfCount);
