import { defOpV } from "./defop.js";

/**
 * Componentwise `Math.tanh` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tanh3 = defOpV(Math.tanh);
