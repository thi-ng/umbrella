import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.trunc` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const trunc: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.trunc(a[i]);}return o;
};