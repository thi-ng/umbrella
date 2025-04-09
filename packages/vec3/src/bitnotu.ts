import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise binary NOT of given 3D unsigned integer vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const bitNotU3: VecOpV = (o,a) => {
!o && (o=a);o[0]=(~a[0])>>>0;o[1]=(~a[1])>>>0;o[2]=(~a[2])>>>0;return o;
};