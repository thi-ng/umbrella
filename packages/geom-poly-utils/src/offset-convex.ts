// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { add2 } from "@thi.ng/vectors/add";
import { cornerBisector } from "@thi.ng/vectors/bisect";

/**
 * Performs naive polygon offsetting, i.e. moving vertices along their bisectors
 * by given `dist`.
 *
 * @remakrs
 * If `points` are in CCW order (assuming Y-up), a positive `dist` will offset
 * outward, and `dist` negative will inset.
 *
 * @example
 * ```ts tangle:../export/offset-convex.ts
 * import { offsetConvex } from "@thi.ng/geom-poly-utils";
 *
 * console.log(offsetConvex([[0,0], [100,0], [50,100]], 5));
 * // [
 * //  [ -4.253, -2.629 ],
 * //  [ 104.286, -2.575 ],
 * //  [ 49.999, 104.999 ]
 * // ]
 * ```
 *
 * @param points
 * @param dist
 */
export const offsetConvex = (points: ReadonlyVec[], dist: number) => {
	const res: Vec[] = [];
	for (let n = points.length, i = n - 1, j = 0; j < n; i = j, j++) {
		res.push(
			add2(
				null,
				points[j],
				cornerBisector(
					[],
					points[i],
					points[j],
					points[(j + 1) % n],
					-dist
				)
			)
		);
	}
	return res;
};
