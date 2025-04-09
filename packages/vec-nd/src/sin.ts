import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.sin` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sin: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.sin(a[i]);}return o;
};