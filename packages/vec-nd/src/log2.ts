import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.log2` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log_2: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.log2(a[i]);}return o;
};