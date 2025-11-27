// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";

/** @internal */
interface Cell<T> {
	x: T;
	n?: Cell<T>;
}

/**
 * Yields an iterator of all `src` values, followed by the same values in
 * reverse order. Efficiently builds the reversed order via an internal linked
 * list. The input MUST be finite!
 *
 * @remarks
 * Also see {@link palindrome}.
 *
 * @example
 * ```ts tangle:../export/symmetric.ts
 * import { symmetric } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...symmetric("abc")]
 * );
 * // [ "a", "b", "c", "c", "b", "a" ]
 *
 * console.log(
 *   [...symmetric([1, 2, 3])]
 * );
 * // [ 1, 2, 3, 3, 2, 1 ]
 * ```
 *
 * @param src -
 */
export function* symmetric<T>(src: Iterable<T>): IterableIterator<T> {
	let head: Maybe<Cell<T>> = undefined;
	for (const x of src) {
		head = { x, n: head };
		yield x;
	}
	while (head) {
		yield head.x;
		head = head.n;
	}
}
