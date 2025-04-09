import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.pow` of given nD vector `a`. Vector `b` contains
 * exponents.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const pow: VecOpVV = (o,a,b) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.pow(a[i],b[i]);}return o;
};