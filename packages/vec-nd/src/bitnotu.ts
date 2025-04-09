import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise binary NOT of given nD unsigned integer vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const bitNotU: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=(~a[i])>>>0;}return o;
};