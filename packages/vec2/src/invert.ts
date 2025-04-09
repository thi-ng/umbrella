import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes the reciprocal (1/x) of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invert2: VecOpV = (o,a) => {
!o && (o=a);o[0]=1/a[0];o[1]=1/a[1];return o;
};