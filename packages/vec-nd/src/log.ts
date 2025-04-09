import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.log` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.log(a[i]);}return o;
};