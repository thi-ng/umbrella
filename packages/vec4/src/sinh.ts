import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.sinh` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sinh4: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.sinh(a[0]);o[1]=Math.sinh(a[1]);o[2]=Math.sinh(a[2]);o[3]=Math.sinh(a[3]);return o;
};