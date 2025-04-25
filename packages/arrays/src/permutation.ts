// SPDX-License-Identifier: Apache-2.0
import type { NumericArray } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import type { IRandom } from "@thi.ng/random";
import { fillRange } from "./fill-range.js";
import { shuffle } from "./shuffle.js";

/**
 * Creates a new array of `n` numbers with a random permutation of integers, in
 * the semi-open [0,n) range (optionally using provided `rnd` instance).
 *
 * @remarks
 * This function is syntax sugar, combining {@link fillRange} and
 * {@link shuffle}.
 *
 * @example
 * ```ts tangle:../export/permutation.ts
 * import { permutation } from "@thi.ng/arrays";
 *
 * console.log(permuation(8));
 * // [ 6, 2, 7, 5, 4, 0, 3, 1 ]
 * ```
 *
 * @param n
 * @param rnd
 */
export function permutation(n: number, rnd?: IRandom): number[];
/**
 * Fill the given array with a random permutation of integers, in the semi-open
 * [0,n) range, where `n` is the length of the array. Optionally uses provided
 * `rnd` instance.
 *
 * @remarks
 * This function is syntax sugar, combining {@link fillRange} and
 * {@link shuffle}.
 *
 * For typed integer arrays, the length of the array must be compatible with its
 * value range, otherwise duplicates will appear (due to value overflow or
 * clamping). E.g. a `Uint8Array` can only have a max length of 256 items if
 * unique values are required. A `Int8Array` can only have a max length of 128
 * values, otherwise negative numbers will appear in the result.
 *
 * @example
 * ```ts tangle:../export/permutation-uint8.ts
 * import { permutation } from "@thi.ng/arrays";
 *
 * const buf = new Uint8Array(16);
 *
 * // permute entire buffer
 * console.log(permutation(buf));
 * // Uint8Array(16) [ 6, 3, 2, 8, 10, 1, 15, 11, 9, 5, 0, 13, 7, 4, 14, 12 ]
 *
 * // apply to only a sub-ranges of the buffer
 * for (let i = 0; i < buf.length; i += 4) {
 * 	console.log(permutation(buf.subarray(i, i + 4)));
 * }
 * // Uint8Array(4) [ 1, 3, 2, 0 ]
 * // Uint8Array(4) [ 2, 0, 3, 1 ]
 * // Uint8Array(4) [ 1, 3, 2, 0 ]
 * // Uint8Array(4) [ 3, 2, 1, 0 ]
 *
 * // show full buffer
 * console.log(buf);
 * // Uint8Array(16) [ 1, 3, 2, 0, 2, 0, 3, 1, 1, 3, 2, 0, 3, 2, 1, 0 ]
 * ```
 *
 * @param n
 * @param rnd
 */
export function permutation<T extends NumericArray>(buf: T, rnd?: IRandom): T;
export function permutation(buf: number | NumericArray, rnd?: IRandom) {
	return shuffle(
		fillRange(isNumber(buf) ? new Array(buf) : buf),
		undefined,
		rnd
	);
}
