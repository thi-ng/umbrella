import { addW3 } from "./addw.js";
import type { ReadonlyVec, Vec } from "./api.js";

/**
 * Vector version of
 * [`mixQuadratic()`](https://docs.thi.ng/umbrella/math/functions/mixQuadratic.html).
 *
 * @param out - result
 * @param a -
 * @param b -
 * @param c -
 * @param t - interpolation coeff [0..1]
 */
export const mixQuadratic = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	t: number
) => {
	const s = 1 - t;
	return addW3(out, a, b, c, s * s, 2 * s * t, t * t);
};
