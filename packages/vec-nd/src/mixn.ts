import type { VecOpVVN } from "@thi.ng/vec-api";

/**
 * Componentwise nD vector linear interpolation with a uniform scalar factor.
 * `o = a + (b - a) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const mixN: VecOpVVN = (o,a,b,n) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=a[i]+(b[i]-a[i])*n;}return o;
};