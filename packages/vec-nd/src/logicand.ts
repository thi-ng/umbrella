import type { BVecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise logical AND of given nD boolean vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicAnd: BVecOpVV = (o,a,b) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=a[i]&&b[i];}return o;
};