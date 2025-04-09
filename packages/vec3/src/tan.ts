import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.tan` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tan3: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.tan(a[0]);o[1]=Math.tan(a[1]);o[2]=Math.tan(a[2]);return o;
};