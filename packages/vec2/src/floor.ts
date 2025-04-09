import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.floor` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const floor2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.floor(a[0]);o[1]=Math.floor(a[1]);return o;
};