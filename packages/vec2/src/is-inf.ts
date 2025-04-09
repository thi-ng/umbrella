import type { ToBVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise checks if given 2D vector is infinite and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isInf2: ToBVecOpV = (o,a) => {
!o&&(o=[]);o[0]=!isFinite(a[0]);o[1]=!isFinite(a[1]);return o;
};