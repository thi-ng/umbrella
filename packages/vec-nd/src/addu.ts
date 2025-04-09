import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise nD unsigned integer vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const addU: VecOpVV = (o,a,b) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=(a[i]+b[i])>>>0;}return o;
};