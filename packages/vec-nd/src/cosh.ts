import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.cosh` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cosh: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.cosh(a[i]);}return o;
};