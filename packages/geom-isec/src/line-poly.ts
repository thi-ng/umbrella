import type { IntersectionResult } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { mag } from "@thi.ng/vectors/mag";
import { normalize2 } from "@thi.ng/vectors/normalize";
import { sub2 } from "@thi.ng/vectors/sub";
import { intersectRayPolylineAll } from "./ray-poly.js";

/**
 * 2D only.
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
	const maxD = mag(dir);
	return intersectRayPolylineAll(
		a,
		normalize2(null, dir),
		pts,
		closed,
		0,
		maxD
	);
};
