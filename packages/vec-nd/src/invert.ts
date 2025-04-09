import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes the reciprocal (1/x) of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invert: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=1/a[i];}return o;
};