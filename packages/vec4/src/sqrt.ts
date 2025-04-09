import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.sqrt` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sqrt4: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.sqrt(a[0]);o[1]=Math.sqrt(a[1]);o[2]=Math.sqrt(a[2]);o[3]=Math.sqrt(a[3]);return o;
};