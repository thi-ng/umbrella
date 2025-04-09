import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.log` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.log(a[0]);o[1]=Math.log(a[1]);return o;
};