import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise absolute value of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const abs2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.abs(a[0]);o[1]=Math.abs(a[1]);return o;
};