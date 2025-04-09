import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.pow` of given nD vector and uniform scalar exponent.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const powN: VecOpVN = (o,a,n) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.pow(a[i],n);}return o;
};