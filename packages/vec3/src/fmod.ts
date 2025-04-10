import type { VecOpVN, VecOpVV } from "@thi.ng/vec-api";

/**
 * Similar to {@link mod3}, {@link remainder3}. This version of modulo uses the
 * same logic as the standard C function `fmod` and/or the JS `%` operator,
 * yielding results with the same sign as `a`, i.e. computes `a-b*trunc(a/b)`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const fmod3: VecOpVV = (o,a,b) => {
!o && (o=a);o[0]=a[0]%b[0];o[1]=a[1]%b[1];o[2]=a[2]%b[2];return o;
};

/**
 * Same as {@link fmod3}, but 2nd operand is a scalar (uniform domain for all
 * vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const fmodN3: VecOpVN = (o,a,n) => {
!o && (o=a);o[0]=a[0]%n;o[1]=a[1]%n;o[2]=a[2]%n;return o;
};
