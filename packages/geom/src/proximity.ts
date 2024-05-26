import type { IShape } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { dist } from "@thi.ng/vectors/dist";
import { closestPoint } from "./closest-point.js";

/**
 * Computes {@link closestPoint} on `shape` to `p`, and if successful, returns
 * Eucledian distance between that point and `p`.
 *
 * @param shape
 * @param p
 */
export const proximity = (shape: IShape, p: ReadonlyVec) => {
	const q = closestPoint(shape, p);
	return q ? dist(p, q) : undefined;
};
