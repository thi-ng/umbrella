import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.log2` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log_22: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.log2(a[0]);o[1]=Math.log2(a[1]);return o;
};