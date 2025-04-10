import { defOpVV } from "./defop.js";

/**
 * Componentwise `Math.min` of given 2D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const min2 = defOpVV(Math.min);
