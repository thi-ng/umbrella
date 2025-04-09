import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.exp` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.exp(a[i]);}return o;
};