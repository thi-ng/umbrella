import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `2^x` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp2_3: VecOpV = (o, a) => {
	!o && (o = a);
	o[0] = 2 ** a[0];
	o[1] = 2 ** a[1];
	o[2] = 2 ** a[2];
	return o;
};
