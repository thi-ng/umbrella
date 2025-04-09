import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.ceil` of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const ceil: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=Math.ceil(a[i]);}return o;
};