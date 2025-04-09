import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.pow` of given 2D vector and uniform scalar exponent.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const powN2: VecOpVN = (o,a,n) => {
!o && (o=a);o[0]=Math.pow(a[0],n);o[1]=Math.pow(a[1],n);return o;
};