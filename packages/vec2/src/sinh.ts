import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.sinh` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sinh2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.sinh(a[0]);o[1]=Math.sinh(a[1]);return o;
};