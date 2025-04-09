import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Componentwise nD unsigned integer vector addition with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addNU: VecOpVN = (o,a,n) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=(a[i]+n)>>>0;}return o;
};