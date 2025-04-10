import { defOpVV } from "./defop.js";

/**
 * Componentwise `Math.max` of given 3D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max3 = defOpVV(Math.max);
