import { defOpV } from "./defop.js";

/**
 * Componentwise `Math.tanh` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tanh2 = defOpV(Math.tanh);
