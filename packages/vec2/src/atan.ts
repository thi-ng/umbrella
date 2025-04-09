import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.atan` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const atan2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.atan(a[0]);o[1]=Math.atan(a[1]);return o;
};