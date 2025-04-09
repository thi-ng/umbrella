import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.min` of given nD vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const min: VecOpVV = (o,a,b) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.min(a[i],b[i]);}return o;
};