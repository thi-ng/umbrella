import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise nD signed integer vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulI: VecOpVV = (o,a,b) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=(a[i]*b[i])|0;}return o;
};