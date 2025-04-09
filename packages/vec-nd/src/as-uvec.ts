import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise converts given nD vector to unsigned integer.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asUVec: VecOpV = (o,a) => {
!o&&(o=[]);for(let i=a.length;--i>=0;) {o[i]=a[i]>>>0;}return o;
};