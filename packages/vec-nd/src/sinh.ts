import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.sinh` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sinh: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.sinh(a[i]);}return o;
};