// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf } from "@thi.ng/api";

/**
 * Iterator yielding key-value pairs of given object's own properties and their
 * values. Same as `zip(keys(x), vals(x))` or iterator version of
 * `Object.entries(x)`.
 *
 * @remarks
 * See also:
 *
 * - {@link vals}
 * - {@link zip}
 *
 * @example
 * ```ts tangle:../export/pairs.ts
 * import { pairs } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...pairs({ a: 1, b: 2 })]
 * );
 * // [['a', 1], ['b', 2]]
 * ```
 *
 *
 * @param x -
 */
export function* pairs<T>(x: IObjectOf<T>): IterableIterator<[string, T]> {
	for (let k in x) {
		if (x.hasOwnProperty(k)) {
			yield [k, x[k]];
		}
	}
}
