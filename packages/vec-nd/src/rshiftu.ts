import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise binary right shift of given nD unsigned integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const rshiftU: VecOpVV = (o,a,b) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=(a[i]>>>b[i])>>>0;}return o;
};