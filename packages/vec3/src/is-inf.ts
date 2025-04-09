import type { ToBVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise checks if given 3D vector is infinite and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isInf3: ToBVecOpV = (o,a) => {
!o&&(o=[]);o[0]=!isFinite(a[0]);o[1]=!isFinite(a[1]);o[2]=!isFinite(a[2]);return o;
};