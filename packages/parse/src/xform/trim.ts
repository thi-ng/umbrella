import type { Parser, ScopeTransform } from "../api.js";
import { xform } from "../combinators/xform.js";

/**
 * Uses `String.trim()` to remove leading and trailing white space and
 * linebreak chars from node result.
 *
 * {@link trim}.
 *
 * @param scope - 
 */
export const xfTrim: ScopeTransform<string> = (scope) => {
    scope!.result = (<string>scope!.result).trim();
    return scope;
};

/**
 * Syntax sugar for `xform(parser, xfTrim)`.
 *
 * @param parser - 
 */
export const trim = (parser: Parser<string>) => xform(parser, xfTrim);
