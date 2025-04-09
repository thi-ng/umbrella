import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Componentwise binary left shift of given 3D unsigned integer vector by
 * uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const lshiftNU3: VecOpVN = (o,a,n) => {
!o && (o=a);o[0]=(a[0]<<n)>>>0;o[1]=(a[1]<<n)>>>0;o[2]=(a[2]<<n)>>>0;return o;
};