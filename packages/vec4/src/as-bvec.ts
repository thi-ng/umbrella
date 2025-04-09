import type { ToBVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise converts given 4D vector to boolean.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asBVec4: ToBVecOpV = (o,a) => {
!o&&(o=[]);o[0]=!!a[0];o[1]=!!a[1];o[2]=!!a[2];o[3]=!!a[3];return o;
};