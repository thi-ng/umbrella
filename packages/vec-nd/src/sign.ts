import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.sign` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sign: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.sign(a[i]);}return o;
};