import type { BVecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise logical NOT of given 4D boolean vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const logicNot4: BVecOpV = (o,a) => {
!o && (o=a);o[0]=!(a[0]);o[1]=!(a[1]);o[2]=!(a[2]);o[3]=!(a[3]);return o;
};