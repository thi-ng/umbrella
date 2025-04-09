import type { VecOpVVV } from "@thi.ng/vec-api";

/**
 * Componentwise 4D vector multiply-add.
 * `o = a * b + c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const madd4: VecOpVVV = (o,a,b,c) => {
!o && (o=a);o[0]=(a[0]*b[0])+c[0];o[1]=(a[1]*b[1])+c[1];o[2]=(a[2]*b[2])+c[2];o[3]=(a[3]*b[3])+c[3];return o;
};