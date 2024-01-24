import type { Parser, ScopeTransform } from "../api.js";
import { xform } from "../combinators/xform.js";

/**
 * Replace AST node with its first child node. Also see {@link hoist}.
 *
 * @param scope -
 */
export const xfHoist: ScopeTransform<any> = (scope) => {
	Object.assign(scope!, scope!.children![0]);
	return scope;
};

/**
 * Moves the result of first child node to this node, then discards all
 * children. Also see {@link hoistResult}.
 *
 * @param scope -
 */
export const xfHoistResult: ScopeTransform<any> = (scope) => {
	scope!.result = scope!.children![0].result;
	scope!.children = null;
	return scope;
};

/**
 * Syntax sugar for `xform(parser, xfHoist)`.
 *
 * @param parser -
 */
export const hoist = <T>(parser: Parser<T>) => xform(parser, xfHoist);

/**
 * Syntax sugar for `xform(parser, xfHoistR)`.
 *
 * @param parser -
 */
export const hoistResult = <T>(parser: Parser<T>) =>
	xform(parser, xfHoistResult);
