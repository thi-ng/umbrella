import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.pow` of given 3D vector `a`. Vector `b` contains
 * exponents.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const pow3: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=Math.pow(a[0],b[0]);o[1]=Math.pow(a[1],b[1]);o[2]=Math.pow(a[2],b[2]);return o;
};