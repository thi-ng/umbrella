import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.cosh` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cosh4: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.cosh(a[0]);o[1]=Math.cosh(a[1]);o[2]=Math.cosh(a[2]);o[3]=Math.cosh(a[3]);return o;
};