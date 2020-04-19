import { Parser, ScopeTransform } from "../api";
import { xform } from "../combinators/xform";

/**
 * Moves the result of first child node to this node, then discards all
 * children. Also see {@link hoist}.
 *
 * @param scope
 */
export const xfHoist: ScopeTransform<any> = (scope) => {
    scope!.result = scope!.children![0].result;
    scope!.children = null;
    return scope;
};

/**
 * Syntax sugar for `xform(parser, xfHoist)`.
 *
 * @param parser
 */
export const hoist = <T>(parser: Parser<T>) => xform(parser, xfHoist);
