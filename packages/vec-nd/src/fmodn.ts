import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Same as {@link fmod}, but 2nd operand is a scalar (uniform domain for all
 * vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const fmodN: VecOpVN = (o,a,n) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=a[i]%n;}return o;
};