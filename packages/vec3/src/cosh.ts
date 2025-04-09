import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.cosh` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cosh3: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.cosh(a[0]);o[1]=Math.cosh(a[1]);o[2]=Math.cosh(a[2]);return o;
};