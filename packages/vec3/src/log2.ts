import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.log2` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log_23: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.log2(a[0]);o[1]=Math.log2(a[1]);o[2]=Math.log2(a[2]);return o;
};