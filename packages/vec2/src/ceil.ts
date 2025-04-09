import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.ceil` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const ceil2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.ceil(a[0]);o[1]=Math.ceil(a[1]);return o;
};