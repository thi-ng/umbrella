// SPDX-License-Identifier: Apache-2.0
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Reducer, Transducer } from "./api.js";
import { iterator } from "./iterator.js";
import { isReduced } from "./reduced.js";

/**
 * Ensures the total number of transformed values will be multiples of `n`.
 *
 * @remarks
 * Only makes sense for finite streams / reductions. Does nothing if the to be
 * transformed data source has exactly multiple of `n` values, but if not pads /
 * supplies additional `fill` values at the end until the next multiple is
 * reached. No padding takes place if input is empty, since length 0 is always a
 * multiple.
 *
 * @example
 * ```ts tangle:../export/pad-last.ts
 * import { padLast } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...padLast(8, 0, [1, 2, 3, 4, 5])]
 * );
 * // [ 1, 2, 3, 4, 5, 0, 0, 0 ]
 *
 * console.log(
 *   [...padLast(8, 0, [1])]
 * );
 * // [ 1, 0, 0, 0, 0, 0, 0, 0 ]
 *
 * console.log(
 *   [...padLast(8, 0, [])]
 * );
 * // []
 *
 * console.log(
 *   [...padLast(4, 0, [1, 2])]
 * );
 * // [ 1, 2, 0, 0 ]
 *
 * console.log(
 *   [...padLast(4, 0, [1, 2, 3, 4, 5])]
 * );
 * // [ 1, 2, 3, 4, 5, 0, 0, 0 ]
 * ```
 *
 * @param n -
 * @param fill -
 */
export function padLast<T>(n: number, fill: T): Transducer<T, T>;
export function padLast<T>(
	n: number,
	fill: T,
	src: Iterable<T>
): IterableIterator<T>;
export function padLast<T>(n: number, fill: T, src?: Iterable<T>): any {
	return isIterable(src)
		? iterator(padLast(n, fill), src)
		: ([init, complete, reduce]: Reducer<T, any>) => {
				let m = 0;
				return <Reducer<T, any>>[
					init,
					(acc) => {
						let rem = m % n;
						if (rem > 0) {
							while (++rem <= n && !isReduced(acc)) {
								acc = reduce(acc, fill);
							}
						}
						return complete(acc);
					},
					(acc, x) => (m++, reduce(acc, x)),
				];
		  };
}
