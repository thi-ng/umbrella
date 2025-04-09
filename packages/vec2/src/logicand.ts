import type { BVecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise logical AND of given 2D boolean vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicAnd2: BVecOpVV = (o,a,b) => {
!o && (o=a);o[0]=a[0]&&b[0];o[1]=a[1]&&b[1];return o;
};