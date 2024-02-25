import type { ReadonlyVec, Vec } from "./api.js";
import { cross3 } from "./cross.js";
import { normalize3 } from "./normalize.js";
import { sub3 } from "./sub.js";

/**
 * Produces a vector which is perpendicular/normal to the plane spanned
 * by given 3 input vectors. If `normalize` is true (default), the
 * result vector will be normalized.
 *
 * @example
 * ```ts
 * import { orthoNormal3 } from "@thi.ng/vectors";
 *
 * orthoNormal3([], [0, 0, 0], [1, 0, 0], [0, 1, 0])
 * // [0, 0, 1]
 * ```
 *
 * @param out -
 * @param a -
 * @param b -
 * @param c -
 * @param normalize -
 */
export const orthoNormal3 = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	doNormalize = true
) => {
	out = cross3(null, sub3(out || a, b, a), sub3([], c, a));
	return doNormalize ? normalize3(out, out) : out;
};
