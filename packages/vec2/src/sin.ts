import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.sin` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sin2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.sin(a[0]);o[1]=Math.sin(a[1]);return o;
};