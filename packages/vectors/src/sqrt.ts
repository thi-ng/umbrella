import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.sqrt);

/**
 * Componentwise computes `Math.sqrt` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sqrt = a;

/**
 * Componentwise computes `Math.sqrt` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sqrt2 = b;

/**
 * Componentwise computes `Math.sqrt` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sqrt3 = c;

/**
 * Componentwise computes `Math.sqrt` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sqrt4 = d;
