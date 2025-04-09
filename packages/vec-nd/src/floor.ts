import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.floor` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const floor: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.floor(a[i]);}return o;
};