import type { FnAny } from "@thi.ng/api";

/**
 * Takes an `init` value and a number of functions and/or function
 * tuples, consisting of: `[fn, ...args]`. Executes each function
 * (or tuple) with the return value of the previous expression inserted
 * as first argument, using `init` for the first expression.
 *
 * @example
 * ```ts
 * const neg = (x) => -x;
 * const sub = (a, b) => a - b;
 * const div = (a, b) => a / b;
 *
 * threadFirst(
 *   5,
 *   neg,       // -5
 *   [sub, 20], // -5 - 20 = -25
 *   [div, 10]  // -25 / 10 = -2.5
 * );
 *
 * // -2.5
 * ```
 *
 * {@link threadLast}
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
