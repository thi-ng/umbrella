import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes `Math.acos` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acos: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.acos(a[i]);}return o;
};