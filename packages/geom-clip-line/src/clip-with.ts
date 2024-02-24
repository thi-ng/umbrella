import type { Predicate2 } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";

/**
 * Segments given polyline based on given predicate and `step` size. Returns
 * array of segmented vertex chunks.
 *
 * @remarks
 * Vertices are processed pairwise using given `step` size (default: 1). As long
 * as the predicate is true, vertices are collected into the current chunk. If
 * the predicate returns false, the current chunk is terminated and depending on
 * `keepLast`, the current vertex (i.e. for which the predicate failed) is still
 * added or not. If `keepLast` is false and the current chunk only included one
 * other vertex, that entire chunk will be discarded.
 *
 * @example
 * ```ts
 * import { clipPolylineWith } from "@thi.ng/geom-clip-line";
 *
 * const pts = [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [4, 0], [5, 0]];
 *
 * // isolate horizontal chunks
 * clipPolylineWith((a, b) => a[1] == b[1], pts)
 * // [
 * //   [[0, 0], [1, 0]],
 * //   [[1, 1], [2, 1], [3, 1]],
 * //   [[4, 0], [5, 0]]
 * // ]
 *
 * // isolate sloped chunks
 * clipPolylineWith((a, b) => a[1] != b[1], pts)
 * // [
 * //   [[1, 0], [1, 1]],
 * //   [[3, 1], [4, 0]]
 * // ]
 * ```
 *
 * @param pred
 * @param pts
 * @param step
 * @param keepLast
 */
export const clipPolylineWith = (
	pred: Predicate2<ReadonlyVec>,
	pts: ReadonlyVec[],
	step = 1,
	keepLast = true
) => {
	const segs: ReadonlyVec[][] = [];
	let last = -1;

	const $terminate = (i: number) => {
		if (last !== -1) {
			if (keepLast) {
				segs[segs.length - 1].push(pts[i]);
			} else if (segs[segs.length - 1].length < 2) {
				segs.pop();
			}
		}
		last = -1;
	};

	for (let i = 0, n = pts.length - step; i < n; i++) {
		if (pred(pts[i], pts[i + step])) {
			if (last === -1) {
				segs.push([pts[i]]);
				last = i;
			} else {
				segs[segs.length - 1].push(pts[i]);
			}
		} else {
			$terminate(i);
		}
	}
	$terminate(pts.length - step);
	return segs;
};
