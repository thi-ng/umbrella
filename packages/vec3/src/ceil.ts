import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.ceil` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const ceil3: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.ceil(a[0]);o[1]=Math.ceil(a[1]);o[2]=Math.ceil(a[2]);return o;
};