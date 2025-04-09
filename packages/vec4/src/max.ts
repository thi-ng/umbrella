import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.max` of given 4D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max4: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=Math.max(a[0],b[0]);o[1]=Math.max(a[1],b[1]);o[2]=Math.max(a[2],b[2]);o[3]=Math.max(a[3],b[3]);return o;
};