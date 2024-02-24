import type { Fn } from "@thi.ng/api";
import type { Parser, ScopeTransform } from "../api.js";
import { xform } from "../combinators/xform.js";
import { indent } from "../utils.js";

/**
 * Side effect only. Higher order scope transform. Traverses current AST
 * node and all children and prints each node's ID, result and reader
 * state (if available). Also see {@link print}.
 *
 * @remarks
 * The optional `fn` function is used to print each AST node (default:
 * `console.log`).
 *
 * @param scope -
 * @param ctx -
 * @param level -
 */
export const xfPrint = (fn: Fn<string, void> = console.log) => {
	const $print: ScopeTransform<any> = (scope, _, level = 0) => {
		if (!scope) return;
		const prefix = indent(level);
		const state = scope.state;
		const info = state ? ` (${state.l}:${state.c})` : "";
		fn(`${prefix}${scope.id}${info}: ${JSON.stringify(scope.result)}`);
		if (scope.children) {
			for (let c of scope.children) {
				$print(c, _, level + 1);
			}
		}
		return scope;
	};
	return $print;
};

/**
 * Syntax sugar for `xform(parser, xfPrint)`.
 *
 * @example
 * ```ts
 * import { defContext, lit, oneOrMore, seq, ALPHA } from "@thi.ng/parse";
 *
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
 * @param parser -
 */
export const print = <T>(parser: Parser<T>, fn?: Fn<string, void>) =>
	xform(parser, xfPrint(fn));
