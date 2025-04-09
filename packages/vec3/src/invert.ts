import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes the reciprocal (1/x) of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invert3: VecOpV = (o,a) => {
!o && (o=a);o[0]=1/a[0];o[1]=1/a[1];o[2]=1/a[2];return o;
};