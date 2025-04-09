import type { VecOpVVN } from "@thi.ng/vec-api";

/**
 * Componentwise nD vector subtract-multiply with scalar factor.
 * `o = (a - b) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const submN: VecOpVVN = (o,a,b,n) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=(a[i]-b[i])*n;}return o;
};