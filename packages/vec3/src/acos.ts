import { defOpV } from "./defop.js";

/**
 * Componentwise computes `Math.acos` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acos3 = defOpV(Math.acos);
