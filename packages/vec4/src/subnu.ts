import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Componentwise 4D unsigned integer vector subtraction with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subNU4: VecOpVN = (o,a,n) => {
!o && (o=a);o[0]=(a[0]-n)>>>0;o[1]=(a[1]-n)>>>0;o[2]=(a[2]-n)>>>0;o[3]=(a[3]-n)>>>0;return o;
};