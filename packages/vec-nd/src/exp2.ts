import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `2^x` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp_2: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=2**a[i];}return o;
};