import { Parser, ScopeTransform } from "../api";
import { xform } from "../combinators/xform";

export const xfCollect: ScopeTransform<any> = (scope) => {
    scope!.result = scope!.children!.map((c) => c.result);
    scope!.children = null;
    return scope;
};

/**
 * Syntax sugar for `xform(parser, xfCollect)`.
 *
 * @param parser
 */
export const collect = <T>(parser: Parser<T>) => xform(parser, xfCollect);
