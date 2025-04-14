import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.sin);

/**
 * Componentwise computes `Math.sin` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sin = a;

/**
 * Componentwise computes `Math.sin` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sin2 = b;

/**
 * Componentwise computes `Math.sin` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sin3 = c;

/**
 * Componentwise computes `Math.sin` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sin4 = d;
