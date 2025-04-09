import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.atan2` of the two given 2D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const atan_22: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=Math.atan2(a[0],b[0]);o[1]=Math.atan2(a[1],b[1]);return o;
};