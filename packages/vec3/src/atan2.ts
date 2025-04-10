import { defOpVV } from "./defop.js";

/**
 * Componentwise computes `Math.atan2` of the two given 3D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const atan2_3 = defOpVV(Math.atan2);
