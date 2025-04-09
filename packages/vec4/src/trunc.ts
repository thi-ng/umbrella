import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.trunc` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const trunc4: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.trunc(a[0]);o[1]=Math.trunc(a[1]);o[2]=Math.trunc(a[2]);o[3]=Math.trunc(a[3]);return o;
};