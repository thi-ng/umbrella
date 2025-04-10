import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `2^x` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp2_2: VecOpV = (o, a) => {
	!o && (o = a);
	o[0] = 2 ** a[0];
	o[1] = 2 ** a[1];
	return o;
};
