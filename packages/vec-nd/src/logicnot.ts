import type { BVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise logical NOT of given nD boolean vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const logicNot: BVecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=!(a[i]);}return o;
};