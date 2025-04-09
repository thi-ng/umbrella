import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.atan2` of the two given nD vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const atan_2: VecOpVV = (o,a,b) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.atan2(a[i],b[i]);}return o;
};