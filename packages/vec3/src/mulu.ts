import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise 3D unsigned integer vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulU3: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=(a[0]*b[0])>>>0;o[1]=(a[1]*b[1])>>>0;o[2]=(a[2]*b[2])>>>0;return o;
};