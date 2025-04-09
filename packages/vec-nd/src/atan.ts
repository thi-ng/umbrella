import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.atan` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const atan: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.atan(a[i]);}return o;
};