import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.tanh` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tanh3: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.tanh(a[0]);o[1]=Math.tanh(a[1]);o[2]=Math.tanh(a[2]);return o;
};