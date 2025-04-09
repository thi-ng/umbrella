import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Same as {@link fmod4}, but 2nd operand is a scalar (uniform domain for all
 * vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const fmodN4: VecOpVN = (o,a,n) => {
!o && (o=a);o[0]=a[0]%n;o[1]=a[1]%n;o[2]=a[2]%n;o[3]=a[3]%n;return o;
};