// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec } from "@thi.ng/vectors";
import { dist as $dist } from "@thi.ng/vectors/dist";
import type { IShape } from "./api.js";
import { closestPoint } from "./closest-point.js";

/**
 * Computes {@link closestPoint} on `shape` to `p`, and if successful, returns
 * the distance between that point and `p`, using optionally given `dist`ance
 * function (by default uses Eucledian distance).
 *
 * @param shape
 * @param p
 * @param dist
 */
export const proximity = (shape: IShape, p: ReadonlyVec, dist = $dist) => {
	const q = closestPoint(shape, p);
	return q ? dist(p, q) : undefined;
};
