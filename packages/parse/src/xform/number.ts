import type { ScopeTransform } from "../api.js";
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
 * First joins all children via {@link xfJoin}, then parses resulting
 * string into a floating point value.
 *
 * @param scope - 
 */
export const xfFloat: ScopeTransform<string> = (scope) => {
    scope!.result = parseFloat(xfJoin(scope)!.result);
    return scope;
};
