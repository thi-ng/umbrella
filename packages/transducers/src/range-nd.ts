// SPDX-License-Identifier: Apache-2.0
import type { ArrayLikeIterable } from "@thi.ng/api";
import { map } from "./map.js";
import { permutations } from "./permutations.js";
import { range, Range } from "./range.js";
import { zip } from "./zip.js";

/**
 * If called with one vector, yields an iterator for the n-dimensional
 * interval: `[[0, 0,...] .. [x, y,...])`. If called with two vectors,
 * the first vector defines the inclusive interval start and the 2nd
 * vector the exclusive interval end. Each dimension can also contain
 * negative values.
 *
 * @example
 * ```ts tangle:../export/range-nd.ts
 * import { rangeNd } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...rangeNd([2])]
 * );
 * // [ [ 0 ], [ 1 ] ]
 *
 * console.log(
 *   [...rangeNd([2, -2])]
 * );
 * // [ [ 0, 0 ], [ 0, -1 ], [ 1, 0 ], [ 1, -1 ] ]
 *
 * console.log(
 *   [...rangeNd([-1, 2], [1, 4])]
 * );
 * // [ [ -1, 2 ], [ -1, 3 ], [ 0, 2 ], [ 0, 3 ] ]
 *
 * console.log(
 *   [...rangeNd([2, 2, 2])]
 * );
 * // [
 * //   [ 0, 0, 0 ],
 * //   [ 0, 0, 1 ],
 * //   [ 0, 1, 0 ],
 * //   [ 0, 1, 1 ],
 * //   [ 1, 0, 0 ],
 * //   [ 1, 0, 1 ],
 * //   [ 1, 1, 0 ],
 * //   [ 1, 1, 1 ]
 * // ]
 * ```
 *
 * @param vec -
 */
export const rangeNd = (
	min: ArrayLikeIterable<number>,
	max?: ArrayLikeIterable<number>
) =>
	permutations.apply(
		null,
		<Range[]>(
			(max
				? [...map(([a, b]) => range(a, b), zip(min, max))]
				: [...map(range, min)])
		)
	);
