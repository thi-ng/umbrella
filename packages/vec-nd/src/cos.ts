import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.cos` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cos: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.cos(a[i]);}return o;
};