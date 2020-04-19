import { Parser, ScopeTransform } from "../api";
import { xform } from "../combinators/xform";
import { indent } from "../utils";

/**
 * Side effect only. Traverses current AST node and all children and
 * prints each node's ID, result and reader state (if available). Also
 * see {@link print}.
 *
 * @param scope
 * @param ctx
 * @param level
 */
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
 * @example
 * ```ts
 * print(seq([lit("["), oneOrMore(ALPHA), lit("]")]))(defContext("[abc]"))
 * // seq: null
 * //   lit: "["
 * //   repeat1: null
 * //     lit: "a"
 * //     lit: "b"
 * //     lit: "c"
 * //   lit: "]"
 * ```
 *
 * @param parser
 */
export const print = <T>(parser: Parser<T>) => xform(parser, xfPrint);
