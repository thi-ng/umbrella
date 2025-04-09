import type { BVecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise logical OR of given 3D boolean vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicOr3: BVecOpVV = (o,a,b) => {
!o && (o=a);o[0]=a[0]||b[0];o[1]=a[1]||b[1];o[2]=a[2]||b[2];return o;
};