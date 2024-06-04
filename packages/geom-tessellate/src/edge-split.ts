import type { Tessellator } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { comp } from "@thi.ng/transducers/comp";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { partition } from "@thi.ng/transducers/partition";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { wrapSides } from "@thi.ng/transducers/wrap-sides";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { addmN } from "@thi.ng/vectors/addmn";
import { distSq } from "@thi.ng/vectors/distsq";

/**
 * Tessellates a polygon into sequence of triangles by splitting each boundary
 * edge and constructing 2 triangles: `amc`, `mbc`, where `a` and `b` are edge
 * endpoints, `m` is the edge centroid and `c` the face centroid.
 *
 * @param points
 */
export const edgeSplit: Tessellator = (points: ReadonlyVec[]) => {
	const c = centroid(points);
	return transduce(
		comp(
			partition<Vec>(2, 1),
			mapcat(([a, b]) => {
				const m = addmN([], a, b, 0.5);
				return [
					[a, m, c],
					[m, b, c],
				];
			})
		),
		push(),
		wrapSides(points, 0, 1)
	);
};

/**
 * Higher-order version of {@link edgeSplit}, with min distance `threshold`.
 * Only splits edges (`a` -> `b`) if the edge length and the distance of the end
 * points to the face centroid `c` is >= `threshold`.
 *
 * @param threshold
 */
export const edgeSplitWithThreshold =
	(threshold: number): Tessellator =>
	(points: ReadonlyVec[]) => {
		const c = centroid(points);
		const minD = threshold * threshold;
		return transduce(
			comp(
				partition<Vec>(2, 1),
				mapcat(([a, b]) => {
					if (
						distSq(a, b) >= minD &&
						distSq(a, c) >= minD &&
						distSq(b, c) >= minD
					) {
						const m = addmN([], a, b, 0.5);
						return [
							[a, m, c],
							[m, b, c],
						];
					} else {
						return [[a, b, c]];
					}
				})
			),
			push(),
			wrapSides(points, 0, 1)
		);
	};
