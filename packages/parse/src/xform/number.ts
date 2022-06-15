import type { Parser, ScopeTransform } from "../api.js";
import { xform } from "../combinators/xform.js";
import { xfJoin } from "./join.js";

/**
 * Higher order transform. First joins all children via {@link xfJoin},
 * then parses resulting string into an integer with given `radix`.
 *
 * @param radix -
 */
export const xfInt =
    (radix = 10): ScopeTransform<string> =>
    (scope) => {
        scope!.result = parseInt(xfJoin(scope)!.result, radix);
        return scope;
    };

/**
 * Syntax sugar for `xform(parser, xfInt(10))`
 *
 * @param parser
 */
export const int = (parser: Parser<string>) => xform(parser, xfInt(10));

/**
 * Syntax sugar for `xform(parser, xfInt(16))`
 *
 * @param parser
 */
export const hexInt = (parser: Parser<string>) => xform(parser, xfInt(16));

/**
 * First joins all children via {@link xfJoin}, then parses resulting
 * string into a floating point value.
 *
 * @param scope -
 */
export const xfFloat: ScopeTransform<string> = (scope) => {
    scope!.result = parseFloat(xfJoin(scope)!.result);
    return scope;
};

/**
 * Syntax sugar for `xform(parser, xfFloat)`
 *
 * @param parser
 */
export const float = (parser: Parser<string>) => xform(parser, xfFloat);
