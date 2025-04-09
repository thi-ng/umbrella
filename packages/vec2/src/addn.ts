import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Componentwise 2D vector addition with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addN2: VecOpVN = (o,a,n) => {
!o && (o=a);o[0]=a[0]+n;o[1]=a[1]+n;return o;
};