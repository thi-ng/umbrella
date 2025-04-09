import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise absolute value of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const abs3: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.abs(a[0]);o[1]=Math.abs(a[1]);o[2]=Math.abs(a[2]);return o;
};