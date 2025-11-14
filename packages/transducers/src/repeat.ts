// SPDX-License-Identifier: Apache-2.0
/**
 * Iterator yielding an infinite (by default) repetition of given value
 * `x`. If `n` is given, only produces that many values.
 *
 * See also: {@link repeatedly}
 *
 * @example
 * ```ts tangle:../export/repeat.ts
 * import { repeat } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...repeat(42, 5)]
 * );
 * // [42, 42, 42, 42, 42]
 * ```
 *
 * @param x - value to repeat
 * @param n - num values (default: ∞)
 */
export function* repeat<T>(x: T, n = Infinity) {
	while (n-- > 0) {
		yield x;
	}
}
