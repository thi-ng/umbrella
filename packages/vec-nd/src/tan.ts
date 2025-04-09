import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.tan` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tan: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.tan(a[i]);}return o;
};