import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.exp` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp3: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.exp(a[0]);o[1]=Math.exp(a[1]);o[2]=Math.exp(a[2]);return o;
};