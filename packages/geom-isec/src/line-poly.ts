// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec } from "@thi.ng/vectors";
import { mag2 } from "@thi.ng/vectors/mag";
import { normalize2 } from "@thi.ng/vectors/normalize";
import { sub2 } from "@thi.ng/vectors/sub";
import { type IntersectionResult } from "./api.js";
import { intersectRayPolylineAll } from "./ray-poly.js";

/**
 * 2D only. Computes first intersection between line segment `a`,`b` and
 * polyline or polygon defined by `pts`.
 *
 * @param a
 * @param b
 * @param pts
 * @param closed
 */
export const intersectLinePolylineAll = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	pts: ReadonlyVec[],
	closed = false
): IntersectionResult => {
	const dir = sub2([], b, a);
	return intersectRayPolylineAll(
		a,
		normalize2(null, dir),
		pts,
		closed,
		0,
		mag2(dir)
	);
};
