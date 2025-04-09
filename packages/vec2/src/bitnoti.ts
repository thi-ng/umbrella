import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise binary NOT of given 2D signed integer vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const bitNotI2: VecOpV = (o,a) => {
!o && (o=a);o[0]=(~a[0])|0;o[1]=(~a[1])|0;return o;
};