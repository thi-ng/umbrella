import { defOpVV } from "./defop.js";

/**
 * Componentwise `Math.max` of given 2D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max2 = defOpVV(Math.max);
