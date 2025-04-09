import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.asin` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asin2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.asin(a[0]);o[1]=Math.asin(a[1]);return o;
};