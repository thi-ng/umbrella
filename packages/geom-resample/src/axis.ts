import { intersectRayPolyline } from "@thi.ng/geom-isec/ray-poly";
import type { ReadonlyVec } from "@thi.ng/vectors";

/**
 * Samples 2D polyline at uniform step distance in `[x1..x2]` interval along
 * X-axis. Returns array of sampled points.
 *
 * @remarks
 * The polyline is assumed to fully cover the given X interval, no gaps are
 * allowed (or checked for). Sampling is done via ray-line intersection with the
 * ray cast into Y+ direction, starting at given `startY`.
 *
 * Also see {@link sampleUniformY}.
 *
 * @example
 * ```ts
 * sampleUniformX([[0, 0], [3, 5], [5, 2]], 0, 5)
 * // [
 * //   [ 0, 0 ],
 * //   [ 1, 1.666... ],
 * //   [ 2, 3.333... ],
 * //   [ 3, 5 ],
 * //   [ 4, 3.5 ],
 * //   [ 5, 2 ]
 * // ]
 * ```
 *
 * @param pts
 * @param x1
 * @param x2
 * @param step
 * @param startY
 */
export const sampleUniformX = (
	pts: ReadonlyVec[],
	x1: number,
	x2: number,
	step = 1,
	startY = -1
) => {
	const res: ReadonlyVec[] = [];
	for (let x = x1; x <= x2; x += step) {
		res.push(
			<ReadonlyVec>(
				intersectRayPolyline([x, startY], [0, 1], pts, false).isec!
			)
		);
	}
	return res;
};

/**
 * Similar to {@link sampleUniformX}, but samples 2D polyline at uniform step
 * distance in `[y1..y2]` interval along Y-axis. Returns array of sampled
 * points.
 *
 * @param pts
 * @param y1
 * @param y2
 * @param step
 * @param startX
 */
export const sampleUniformY = (
	pts: ReadonlyVec[],
	y1: number,
	y2: number,
	step = 1,
	startX = -1
) => {
	const res: ReadonlyVec[] = [];
	for (let y = y1; y <= y2; y += step) {
		res.push(
			<ReadonlyVec>(
				intersectRayPolyline([startX, y], [1, 0], pts, false).isec!
			)
		);
	}
	return res;
};
