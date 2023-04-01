import type { ReadonlyVec, Vec, VecPair } from "@thi.ng/vectors";
import { comparator2 } from "@thi.ng/vectors/compare";

/**
 * Extracts horizontal line segments (along X-axis) from given point cloud
 * (assuming all points are aligned to a grid, e.g. pixel coords). Returns
 * object of `{segments, points}`, where `segments` contains all extracted
 * segments and `points` all remaining/unmatched points.
 *
 * @remarks
 * The given point array will be sorted (in-place!). Line segments will be as
 * long as possible, depending on chosen `maxDist`, which defines max distance
 * between consecutive points. If a point is further away than `maxDist` units
 * from the previous point (or at a new X coord), the current line segment (if
 * any) will be terminated and the new point is potentially becoming the start
 * of the next segment.
 *
 * @param pts
 * @param maxDist
 */
export const extractSegmentsX = (pts: ReadonlyVec[], maxD = 5) =>
	__extract(pts, maxD, 1);

/**
 * Similar to {@link extractSegmentsX}, but for extracting vertical line
 * segments (along Y-axis).
 *
 * @param pts
 * @param maxDist
 */
export const extractSegmentsY = (pts: ReadonlyVec[], maxDist = 5) =>
	__extract(pts, maxDist, 0);

/**
 * Common implementation for both axis orders.
 *
 * @param pts
 * @param maxD
 * @param order
 *
 * @internal
 */
const __extract = (pts: ReadonlyVec[], maxD: number, order: number) => {
	if (pts.length < 2) return { segments: [], points: pts };
	const $ = order ? (p: ReadonlyVec) => [p[1], p[0]] : (p: ReadonlyVec) => p;
	pts = pts.sort(comparator2(order, order ^ 1));
	const segments: VecPair[] = [];
	const points: Vec[] = [];
	let [outer, inner] = $(pts[0]);
	let last = 0;
	for (let i = 1, n = pts.length - 1; i <= n; i++) {
		const p = $(pts[i]);
		if (p[0] === outer) {
			if (i === n || p[1] - inner > maxD) {
				if (i - last > 1) {
					segments.push([pts[last], pts[i - 1]]);
				} else {
					points.push(pts[last]);
				}
				last = i;
			}
			inner = p[1];
		} else {
			if (i - last > 1) {
				segments.push([pts[last], pts[i - 1]]);
			} else {
				points.push(pts[last]);
			}
			last = i;
			[outer, inner] = p;
		}
	}
	return { segments, points };
};
