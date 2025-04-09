import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.floor` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const floor4: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.floor(a[0]);o[1]=Math.floor(a[1]);o[2]=Math.floor(a[2]);o[3]=Math.floor(a[3]);return o;
};