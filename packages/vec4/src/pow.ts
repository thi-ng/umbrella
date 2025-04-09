import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.pow` of given 4D vector `a`. Vector `b` contains
 * exponents.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const pow4: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=Math.pow(a[0],b[0]);o[1]=Math.pow(a[1],b[1]);o[2]=Math.pow(a[2],b[2]);o[3]=Math.pow(a[3],b[3]);return o;
};