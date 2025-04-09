import type { VecOpVNV } from "@thi.ng/vec-api";

/**
 * Componentwise nD vector multiply-add with a uniform scalar factor.
 * `o = a * n + b`
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const maddN: VecOpVNV = (o,a,n,b) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=(a[i]*n)+b[i];}return o;
};