import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Similar to {@link mod}, {@link remainder}. This version of modulo uses the
 * same logic as the standard C function `fmod` and/or the JS `%` operator,
 * yielding results with the same sign as `a`, i.e. computes `a-b*trunc(a/b)`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const fmod: VecOpVV = (o,a,b) => {
!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=a[i]%b[i];}return o;
};