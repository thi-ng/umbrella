import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.atan2` of the two given 4D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const atan_24: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=Math.atan2(a[0],b[0]);o[1]=Math.atan2(a[1],b[1]);o[2]=Math.atan2(a[2],b[2]);o[3]=Math.atan2(a[3],b[3]);return o;
};