import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.cos` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cos4: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.cos(a[0]);o[1]=Math.cos(a[1]);o[2]=Math.cos(a[2]);o[3]=Math.cos(a[3]);return o;
};