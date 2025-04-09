import type { FromBVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise converts given nD boolean vector to floating point (0 or 1).
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fromBVec: FromBVecOpV = (o,a) => {
!o&&(o=[]);for(let i=a.length;--i>=0;) {o[i]=~~a[i];}return o;
};