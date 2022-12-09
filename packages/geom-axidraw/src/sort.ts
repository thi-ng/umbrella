import { sortByCachedKey } from "@thi.ng/arrays/sort-cached";
import { compareNumAsc } from "@thi.ng/compare/numeric";
import type { IShape } from "@thi.ng/geom-api";
import { bounds2 } from "@thi.ng/geom-poly-utils/bounds";
import { bounds } from "@thi.ng/geom/bounds";
import { centroid } from "@thi.ng/geom/centroid";
import { __collBounds } from "@thi.ng/geom/internal/bounds";
import { ReadonlyVec, ZERO2 } from "@thi.ng/vectors/api";
import { distSq2 } from "@thi.ng/vectors/distsq";
import type { PointOrdering, ShapeOrdering } from "./api.js";

/**
 * Higher order point sorting fn. Sorts points by proximity to given `ref` point
 * (default: bounds min).
 *
 * @param ref
 */
export const pointsByProximity =
	(ref?: ReadonlyVec): PointOrdering =>
	(pts: ReadonlyVec[]) => {
		ref = ref || bounds2(pts)[0];
		return sortByCachedKey(
			pts.slice(),
			(p) => distSq2(p, ref!),
			compareNumAsc
		);
	};

/**
 * Higher order shape sorting fn. Sorts shapes by their centroid's proximity to
 * given `ref` point (default: bounds min).
 *
 * @param ref
 */
export const shapesByProximity =
	(ref?: ReadonlyVec): ShapeOrdering =>
	(shapes: IShape[]) => {
		ref = ref || __collBounds(shapes, bounds)![0];
		return sortByCachedKey(
			shapes.slice(),
			(s) => distSq2(centroid(s) || ZERO2, ref!),
			compareNumAsc
		);
	};
