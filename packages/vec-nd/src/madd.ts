import type { VecOpVVV } from "@thi.ng/vec-api";

/**
 * Componentwise nD vector multiply-add.
 * `o = a * b + c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const madd: VecOpVVV = (o,a,b,c) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=(a[i]*b[i])+c[i];}return o;
};