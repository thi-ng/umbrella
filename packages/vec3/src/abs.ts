import { defOpV } from "./defop.js";

/**
 * Componentwise absolute value of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const abs3 = defOpV(Math.abs);
