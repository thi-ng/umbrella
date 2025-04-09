import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Componentwise binary OR of given 2D unsigned integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNU2: VecOpVN = (o,a,n) => {
!o && (o=a);o[0]=(a[0]|n)>>>0;o[1]=(a[1]|n)>>>0;return o;
};