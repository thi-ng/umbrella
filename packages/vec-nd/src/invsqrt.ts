import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes the inverse squareroot of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invSqrt: VecOpV = (o,a) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=1/Math.sqrt(a[i]);}return o;
};