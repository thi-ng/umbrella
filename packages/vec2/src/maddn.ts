import type { VecOpVNV } from "@thi.ng/vec-api";

/**
 * Componentwise 2D vector multiply-add with a uniform scalar factor.
 * `o = a * n + b`
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const maddN2: VecOpVNV = (o,a,n,b) => {
!o && (o=a);o[0]=(a[0]*n)+b[0];o[1]=(a[1]*n)+b[1];return o;
};