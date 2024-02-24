import type { FnAny } from "@thi.ng/api";

/**
 * Similar to {@link threadFirst}. A dataflow operator to improve the legibility
 * of long (or deeply nested) call expressions. Takes an `init` value and a
 * number of functions and/or function tuples, consisting of: `[fn, ...args]`.
 * Executes each function (or tuple) with the return value of the previous
 * step/function inserted as **last** argument, using `init` as the first
 * expression. Returns result of last function/step given.
 *
 * @remarks
 * This operator allows the code to be read more easily in the order of
 * execution (same as the `->>` operator/macro in Clojure).
 *
 * @example
 * ```ts
 * import { threadLast } from "@thi.ng/compose";
 *
 * const neg = (x) => -x;
 * const sub = (a, b) => a - b;
 * const div = (a, b) => a / b;
 *
 * // without operator: 20 / (10 - (-5))
 * console.log(div(20, sub(10, neg(5))));
 * // 1.3333333333333333
 *
 * // rewritten using operator:
 * threadLast(
 *   5,
 *   neg,       // -5
 *   [sub, 10], // 10 - (-5)
 *   [div, 20],  // 20 / (10 - (-5))
 *   console.log
 * );
 * // 1.3333333333333333
 * ```
 *
 * @param init - start value
 * @param fns - functions / S-expressions
 */
export const threadLast = (
	init: any,
	...fns: (FnAny<any> | [FnAny<any>, ...any[]])[]
) =>
	fns.reduce(
		(acc, expr) =>
			typeof expr === "function"
				? expr(acc)
				: expr[0](...expr.slice(1), acc),
		init
	);
