import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise binary XOR of given nD unsigned integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitXorU: VecOpVV = (o,a,b) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=(a[i]^b[i])>>>0;}return o;
};