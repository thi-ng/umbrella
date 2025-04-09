import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise absolute value of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const abs4: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.abs(a[0]);o[1]=Math.abs(a[1]);o[2]=Math.abs(a[2]);o[3]=Math.abs(a[3]);return o;
};