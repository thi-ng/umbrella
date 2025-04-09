import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes the inverse squareroot of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invSqrt3: VecOpV = (o,a) => {
!o && (o=a);o[0]=1/Math.sqrt(a[0]);o[1]=1/Math.sqrt(a[1]);o[2]=1/Math.sqrt(a[2]);return o;
};