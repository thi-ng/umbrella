import type { VecOpVVN } from "@thi.ng/vec-api";

/**
 * Componentwise 4D vector linear interpolation with a uniform scalar factor.
 * `o = a + (b - a) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const mixN4: VecOpVVN = (o,a,b,n) => {
!o && (o=a);o[0]=a[0]+(b[0]-a[0])*n;o[1]=a[1]+(b[1]-a[1])*n;o[2]=a[2]+(b[2]-a[2])*n;o[3]=a[3]+(b[3]-a[3])*n;return o;
};