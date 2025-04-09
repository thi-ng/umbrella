import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise 4D vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mul4: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=a[0]*b[0];o[1]=a[1]*b[1];o[2]=a[2]*b[2];o[3]=a[3]*b[3];return o;
};