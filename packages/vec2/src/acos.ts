import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.acos` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acos2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.acos(a[0]);o[1]=Math.acos(a[1]);return o;
};