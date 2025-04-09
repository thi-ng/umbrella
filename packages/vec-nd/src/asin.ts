import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.asin` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asin: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.asin(a[i]);}return o;
};