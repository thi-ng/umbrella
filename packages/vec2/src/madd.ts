import type { VecOpVVV } from "@thi.ng/vec-api";

/**
 * Componentwise 2D vector multiply-add.
 * `o = a * b + c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const madd2: VecOpVVV = (o,a,b,c) => {
!o && (o=a);o[0]=(a[0]*b[0])+c[0];o[1]=(a[1]*b[1])+c[1];return o;
};