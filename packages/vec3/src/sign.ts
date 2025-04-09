import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.sign` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sign3: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.sign(a[0]);o[1]=Math.sign(a[1]);o[2]=Math.sign(a[2]);return o;
};