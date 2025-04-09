import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Componentwise binary OR of given nD unsigned integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNU: VecOpVN = (o,a,n) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=(a[i]|n)>>>0;}return o;
};