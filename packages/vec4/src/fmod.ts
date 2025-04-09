import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Similar to {@link mod4}, {@link remainder4}. This version of modulo uses the
 * same logic as the standard C function `fmod` and/or the JS `%` operator,
 * yielding results with the same sign as `a`, i.e. computes `a-b*trunc(a/b)`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const fmod4: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=a[0]%b[0];o[1]=a[1]%b[1];o[2]=a[2]%b[2];o[3]=a[3]%b[3];return o;
};