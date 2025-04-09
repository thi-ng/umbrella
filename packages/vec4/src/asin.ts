import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.asin` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asin4: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.asin(a[0]);o[1]=Math.asin(a[1]);o[2]=Math.asin(a[2]);o[3]=Math.asin(a[3]);return o;
};