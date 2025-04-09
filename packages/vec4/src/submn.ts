import type { VecOpVVN } from "@thi.ng/vec-api";

/**
 * Componentwise 4D vector subtract-multiply with scalar factor.
 * `o = (a - b) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const submN4: VecOpVVN = (o,a,b,n) => {
!o && (o=a);o[0]=(a[0]-b[0])*n;o[1]=(a[1]-b[1])*n;o[2]=(a[2]-b[2])*n;o[3]=(a[3]-b[3])*n;return o;
};