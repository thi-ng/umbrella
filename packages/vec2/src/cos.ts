import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.cos` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cos2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.cos(a[0]);o[1]=Math.cos(a[1]);return o;
};