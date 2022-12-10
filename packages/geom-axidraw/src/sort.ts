import { sortByCachedKey } from "@thi.ng/arrays/sort-cached";
import { compareNumAsc } from "@thi.ng/compare/numeric";
import { KdTreeSet } from "@thi.ng/geom-accel/kd-tree-set";
import type { IShape } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom/centroid";
import { ReadonlyVec, ZERO2 } from "@thi.ng/vectors/api";
import { distSq2 } from "@thi.ng/vectors/distsq";
import type { PointOrdering, ShapeOrdering } from "./api.js";

/**
 * Higher order point ordering fn. Lazily sorts points by nearest neighbor
 * distance, starting selection of first point based on given `ref` point
 * (default: [0, 0]).
 *
 * @remarks
 * Internally uses a
 * [`KdTreeSet`](https://docs.thi.ng/umbrella/geom-accel/classes/KdTreeSet.html)
 * to index all points and then successively perform efficient nearest neighbor
 * searches (always w.r.t the most recent result point).
 *
 * @param ref
 */
export const pointsByNearestNeighbor = (
	ref: ReadonlyVec = ZERO2
): PointOrdering =>
	function* (pts: ReadonlyVec[]) {
		const index = new KdTreeSet(2, pts);
		while (index.size) {
			ref = index.queryKeys(ref, 1e4, 1)[0];
			index.remove(ref);
			yield ref;
		}
	};

/**
 * Higher order point ordering fn. Sorts points by proximity to given `ref` point
 * (default: [0, 0]).
 *
 * @param ref
 */
export const pointsByProximity =
	(ref: ReadonlyVec = ZERO2): PointOrdering =>
	(pts: ReadonlyVec[]) => {
		return sortByCachedKey(
			pts.slice(),
			(p) => distSq2(p, ref!),
			compareNumAsc
		);
	};

/**
 * Higher order shape sorting fn. Sorts shapes by their centroid's proximity to
 * given `ref` point (default: [0, 0]).
 *
 * @param ref
 */
export const shapesByProximity =
	(ref: ReadonlyVec = ZERO2): ShapeOrdering =>
	(shapes: IShape[]) => {
		return sortByCachedKey(
			shapes.slice(),
			(s) => distSq2(centroid(s) || ZERO2, ref!),
			compareNumAsc
		);
	};
