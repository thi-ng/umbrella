import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.tanh` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tanh: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.tanh(a[i]);}return o;
};