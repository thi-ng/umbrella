import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise absolute value of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const abs: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.abs(a[i]);}return o;
};