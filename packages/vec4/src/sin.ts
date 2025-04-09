import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.sin` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sin4: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.sin(a[0]);o[1]=Math.sin(a[1]);o[2]=Math.sin(a[2]);o[3]=Math.sin(a[3]);return o;
};