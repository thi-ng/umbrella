import type { ToBVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise converts given 2D vector to boolean.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asBVec2: ToBVecOpV = (o,a) => {
!o&&(o=[]);o[0]=!!a[0];o[1]=!!a[1];return o;
};