import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise `Math.tanh` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tanh2: VecOpV = (o,a) => {
!o && (o=a);o[0]=Math.tanh(a[0]);o[1]=Math.tanh(a[1]);return o;
};