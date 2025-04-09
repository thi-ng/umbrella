import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.sqrt` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sqrt: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.sqrt(a[i]);}return o;
};