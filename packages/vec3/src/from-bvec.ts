import type { FromBVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise converts given 3D boolean vector to floating point (0 or 1).
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fromBVec3: FromBVecOpV = (o,a) => {
!o&&(o=[]);o[0]=~~a[0];o[1]=~~a[1];o[2]=~~a[2];return o;
};