import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.cos` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cos3: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.cos(a[0]);o[1]=Math.cos(a[1]);o[2]=Math.cos(a[2]);return o;
};