import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.trunc` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const trunc3: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.trunc(a[0]);o[1]=Math.trunc(a[1]);o[2]=Math.trunc(a[2]);return o;
};