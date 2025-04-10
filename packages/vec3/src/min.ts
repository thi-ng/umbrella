import { defOpVV } from "./defop.js";

/**
 * Componentwise `Math.min` of given 3D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const min3 = defOpVV(Math.min);
