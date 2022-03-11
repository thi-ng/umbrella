import type { Parser, ScopeTransform } from "../api.js";
import { xform } from "../combinators/xform.js";

/**
 * Collects results of all direct children into an array, then discards
 * children. Also see {@link collect}.
 *
 * @param scope - 
 */
export const xfCollect: ScopeTransform<any> = (scope) => {
    scope!.result = scope!.children!.map((c) => c.result);
    scope!.children = null;
    return scope;
};

/**
 * Syntax sugar for `xform(parser, xfCollect)`.
 *
 * @param parser - 
 */
export const collect = <T>(parser: Parser<T>) => xform(parser, xfCollect);
