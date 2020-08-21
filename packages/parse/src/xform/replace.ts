import type { Parser, ScopeTransform } from "../api";
import { xform } from "../combinators/xform";

/**
 * HOF scope transform which replaces a node's result with given pre-configured
 * value and discards node's children. Also see {@link replace}.
 *
 * @param result - replacement value
 */
export const xfReplace = <T>(result: any): ScopeTransform<T> => (scope) => {
    scope!.result = result;
    scope!.children = null;
    return scope;
};

/**
 * Syntax sugar for `xform(parser, xfReplace(result))`.
 *
 * @param parser -
 * @param result -
 */
export const replace = <T>(parser: Parser<T>, result: any) =>
    xform(parser, xfReplace(result));
