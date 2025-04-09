import type { ToBVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise converts given nD vector to boolean.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asBVec: ToBVecOpV = (o,a) => {
!o&&(o=[]);for(let i=a.length;--i>=0;) {o[i]=!!a[i];}return o;
};