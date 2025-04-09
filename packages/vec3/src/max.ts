import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.max` of given 3D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max3: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=Math.max(a[0],b[0]);o[1]=Math.max(a[1],b[1]);o[2]=Math.max(a[2],b[2]);return o;
};