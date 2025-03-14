// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";

/**
 * Iterator yielding return values of given single-arg function `fn` (called
 * with `i`, current iteration count). If `n` is given, only that many values
 * will be produced, else the iterator is infinite.
 *
 * @example
 * ```ts tangle:../export/repeatedly.ts
 * import { repeatedly } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...repeatedly(() => Math.floor(Math.random() * 10), 5)]
 * );
 * // [7, 0, 9, 3, 1]
 *
 * // same result as range(5)
 * console.log(
 *   [...repeatedly((i) => i, 5)]
 * );
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * @param fn - value producer
 * @param n - num values (default: ∞)
 */
export function* repeatedly<T>(fn: Fn<number, T>, n = Infinity) {
	for (let i = 0; i < n; i++) {
		yield fn(i);
	}
}
