import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.acos` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acos3: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.acos(a[0]);o[1]=Math.acos(a[1]);o[2]=Math.acos(a[2]);return o;
};