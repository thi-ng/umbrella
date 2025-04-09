import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise 2D vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mul2: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=a[0]*b[0];o[1]=a[1]*b[1];return o;
};