import type { FromBVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise converts given 2D boolean vector to floating point (0 or 1).
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fromBVec2: FromBVecOpV = (o,a) => {
!o&&(o=[]);o[0]=~~a[0];o[1]=~~a[1];return o;
};