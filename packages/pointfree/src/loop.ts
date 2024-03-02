import type { StackContext, StackProc } from "./api.js";
import { $ } from "./safe.js";
import { $stackFn } from "./word.js";

//////////////////// Loop constructs  ////////////////////

/**
 * Higher order word. Takes a `test` and `body` stack program. Applies
 * test to copy of TOS and executes body. Repeats while test is truthy.
 *
 * ( -- ? )
 *
 * @example
 * ```js
 * import { dec, dup, ispos, print, run } from "@thi.ng/pointfree";
 *
 * run([loop([dup, ispos], [dup, print, dec])], [[3]])
 * // 3
 * // 2
 * // 1
 * // [ true, [ 0 ], undefined ]
 * ```
 *
 * @param test -
 * @param body -
 */
export const defLoop = (test: StackProc, body: StackProc) => {
	const _test = $stackFn(test);
	const _body = $stackFn(body);
	return (ctx: StackContext) => {
		while (true) {
			ctx = _test(ctx);
			$(ctx[0], 1);
			if (!ctx[0].pop()) {
				return ctx;
			}
			ctx = _body(ctx);
		}
	};
};

/**
 * Non-HOF version of {@link defLoop}. Expects test result and body quotation /
 * word on d-stack.
 *
 * ( testq bodyq -- ? )
 *
 * @param ctx -
 */
export const loopq = (ctx: StackContext) => {
	const stack = ctx[0];
	$(stack, 2);
	const body = stack.pop();
	return defLoop(stack.pop(), body)(ctx);
};

/**
 * Executes given `body` word/quotation `n` times. In each iteration
 * pushes current counter on d-stack prior to executing body.
 *
 * @example
 * ```js
 * import { add, print, swap, runU } from "@thi.ng/pointfree";
 *
 * run([3, ["i=", swap, add, print], dotimes])
 * // i=0
 * // i=1
 * // i=2
 * ```
 *
 * With empty body acts as finite range generator 0 .. n:
 *
 * ```js
 * import { collect, cpdr, dotimes, movrd, run, runU } from "@thi.ng/pointfree";
 *
 * // range gen
 * run([3, [], dotimes])
 * [ [ 0, 1, 2 ], [], {} ]
 *
 * // range gen (collect results as array)
 * runU([3, cpdr, [], dotimes, movrd, collect])
 * // [ 0, 1, 2 ]
 * ```
 *
 * ( n body -- ? )
 *
 * @param body -
 */
export const dotimes = (ctx: StackContext) => {
	let stack = ctx[0];
	$(stack, 2);
	const w = $stackFn(stack.pop());
	for (let i = 0, n = stack.pop(); i < n; i++) {
		ctx[0].push(i);
		ctx = w(ctx);
	}
	return ctx;
};
