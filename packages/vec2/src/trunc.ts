import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.trunc` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const trunc2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.trunc(a[0]);o[1]=Math.trunc(a[1]);return o;
};