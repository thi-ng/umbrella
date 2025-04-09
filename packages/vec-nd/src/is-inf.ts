import type { ToBVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise checks if given nD vector is infinite and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isInf: ToBVecOpV = (o,a) => {
!o&&(o=[]);for(let i=a.length;--i>=0;) {o[i]=!isFinite(a[i]);}return o;
};