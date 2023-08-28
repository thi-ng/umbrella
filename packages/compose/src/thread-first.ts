import type { FnAny } from "@thi.ng/api";

/**
 * Similar to {@link threadLast}. A dataflow operator to improve the legibility
 * of long (or deeply nested) call expressions. Takes an `init` value and a
 * number of functions and/or function tuples, consisting of: `[fn, ...args]`.
 * Executes each function (or tuple) with the return value of the previous
 * step/function inserted as **first** argument, using `init` as the first
 * expression. Returns result of last function/step given.
 *
 * @remarks
 * This operator allows the code to be read more easily in the order of
 * execution (same as the `->` operator/macro in Clojure).
 *
 * @example
 * ```ts
 * const neg = (x) => -x;
 * const sub = (a, b) => a - b;
 * const div = (a, b) => a / b;
 *
 * // without operator: (-5 - 10) / 20
 * console.log(div(sub(neg(5), 10), 20));
 * // -0.75
 *
 * // rewritten using operator:
 * threadFirst(
 *   5,
 *   neg,       // -5
 *   [sub, 10], // (-5) - 10
 *   [div, 20], // (-5 - 10) / 20
 *   console.log
 * );
 * // -0.75
 * ```
 *
 * @param init - start value
 * @param fns - functions / S-expressions
 */
export const threadFirst = (
	init: any,
	...fns: (FnAny<any> | [FnAny<any>, ...any[]])[]
) =>
	fns.reduce(
		(acc, expr) =>
			typeof expr === "function"
				? expr(acc)
				: expr[0](acc, ...expr.slice(1)),
		init
	);
