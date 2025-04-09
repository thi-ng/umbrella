import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.acos` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acos4: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.acos(a[0]);o[1]=Math.acos(a[1]);o[2]=Math.acos(a[2]);o[3]=Math.acos(a[3]);return o;
};