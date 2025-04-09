import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.log2` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log_24: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.log2(a[0]);o[1]=Math.log2(a[1]);o[2]=Math.log2(a[2]);o[3]=Math.log2(a[3]);return o;
};