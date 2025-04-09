import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise nD vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const add: VecOpVV = (o,a,b) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=a[i]+b[i];}return o;
};