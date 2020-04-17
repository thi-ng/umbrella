import { Parser, ScopeTransform } from "../api";
import { xform } from "../combinators/xform";
import { indent } from "../utils";

export const xfPrint: ScopeTransform<any> = (scope, _, level = 0) => {
    if (!scope) return;
    const prefix = indent(level);
    const state = scope.state;
    const info = state ? ` (${state.l}:${state.c})` : "";
    console.log(`${prefix}${scope.id}${info}: ${JSON.stringify(scope.result)}`);
    if (scope.children) {
        for (let c of scope.children) {
            xfPrint(c, _, level + 1);
        }
    }
    return scope;
};

/**
 * Syntax sugar for `xform(parser, xfPrint)`.
 *
 * @param parser
 */
export const print = <T>(parser: Parser<T>) => xform(parser, xfPrint);
