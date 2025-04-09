import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Componentwise nD vector addition with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addN: VecOpVN = (o,a,n) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=a[i]+n;}return o;
};