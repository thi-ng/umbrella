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
 * Combined tessellator of {@link triFan}, followed by {@link rimTris}, but in a
 * single pass. Also see {@link triFanSplitWithThreshold}.
 *
 * @param points
 */
export const triFanSplit: Tessellator = (points: ReadonlyVec[]) => {
	const c = centroid(points);
	return transduce(
		comp(
			partition<Vec>(2, 1),
			mapcat(([a, b]) => {
				const mab = addmN([], a, b, 0.5);
				const mac = addmN([], a, c, 0.5);
				const mbc = addmN([], b, c, 0.5);
				return [
					[a, mab, mac],
					[mab, b, mbc],
					[mac, mab, mbc],
					[mac, mbc, c],
				];
			})
		),
		push(),
		wrapSides(points, 0, 1)
	);
};

/**
 * Higher-order version {@link triFanSplit}, taking a min. edge length
 * `threshold` to enforce min triangle size.
 *
 * @param threshold
 */
export const triFanSplitWithThreshold =
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
						const mab = addmN([], a, b, 0.5);
						const mac = addmN([], a, c, 0.5);
						const mbc = addmN([], b, c, 0.5);
						return [
							[a, mab, mac],
							[mab, b, mbc],
							[mac, mab, mbc],
							[mac, mbc, c],
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
