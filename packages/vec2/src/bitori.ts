import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise binary OR of given 2D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrI2: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=(a[0]|b[0])|0;o[1]=(a[1]|b[1])|0;return o;
};