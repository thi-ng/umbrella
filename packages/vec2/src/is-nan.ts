import type { ToBVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise checks if given 2D vector is NaN and writes results to boolean
 * output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isNaN2: ToBVecOpV = (o, a) => {
	!o && (o = []);
	o[0] = isNaN(a[0]);
	o[1] = isNaN(a[1]);
	return o;
};
