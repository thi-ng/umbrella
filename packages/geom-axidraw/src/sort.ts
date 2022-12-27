import { sortByCachedKey } from "@thi.ng/arrays/sort-cached";
import { compareNumAsc } from "@thi.ng/compare/numeric";
import { KdTreeSet } from "@thi.ng/geom-accel/kd-tree-set";
import type {
	IRegionQuery,
	IShape,
	ISpatialMap,
	ISpatialSet,
} from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom/centroid";
import { ReadonlyVec, ZERO2 } from "@thi.ng/vectors/api";
import { distSq2 } from "@thi.ng/vectors/distsq";
import type { PointOrdering, ShapeOrdering } from "./api.js";

/**
 * Higher order point ordering fn. Adds points to given spatial
 * index/acceleration structure and then lazily sorts them by nearest neighbor
 * distance, starting selection of first point based on given `ref` point
 * (default: [0, 0]).
 *
 * @remarks
 * By default is using a
 * [`KdTreeSet`](https://docs.thi.ng/umbrella/geom-accel/classes/KdTreeSet.html)
 * to index all points and then successively perform efficient nearest neighbor
 * searches (always w.r.t the most recent result point).
 *
 * @param accel
 * @param ref
 */
export const pointsByNearestNeighbor = (
	accel: ISpatialSet<ReadonlyVec> &
		IRegionQuery<ReadonlyVec, ReadonlyVec, number> = new KdTreeSet(2),
	ref: ReadonlyVec = ZERO2
): PointOrdering =>
	function* (pts: ReadonlyVec[]) {
		accel.into(pts);
		// const index = new KdTreeSet(2, pts);
		while (accel.size) {
			ref = accel.queryKeys(ref, 1e4, 1)[0];
			accel.remove(ref);
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

/**
 * Similar to {@link pointsByNearestNeighbor}, however for shapes and requiring
 * an
 * [`ISpatialMap`](https://docs.thi.ng/umbrella/geom-api/interfaces/ISpatialMap.html)
 * implementation and is using shape centroid (auto-computed) to perform
 * indexing and nearest neighbor queries.
 *
 * @remarks
 * Currently recommended to use
 * [`NdQuadtreeMap`](https://docs.thi.ng/umbrella/geom-accel/classes/NdQuadtreeMap.html).
 *
 * @param accel
 * @param ref
 */
export const shapesByNearestNeighbor = (
	accel: ISpatialMap<ReadonlyVec, IShape> &
		IRegionQuery<ReadonlyVec, IShape, number>,
	ref: ReadonlyVec = ZERO2
): ShapeOrdering =>
	function* (shapes: IShape[]) {
		accel.into(
			shapes.map((s) => <[ReadonlyVec, IShape]>[centroid(s) || [0, 0], s])
		);
		while (accel.size) {
			const pair = accel.query(ref, 1e4, 1)[0];
			ref = pair[0];
			accel.remove(ref);
			yield pair[1];
		}
	};
