import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes the inverse squareroot of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invSqrt4: VecOpV = (o,a) => {
!o && (o=a);o[0]=1/Math.sqrt(a[0]);o[1]=1/Math.sqrt(a[1]);o[2]=1/Math.sqrt(a[2]);o[3]=1/Math.sqrt(a[3]);return o;
};