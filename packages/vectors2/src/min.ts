import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV(Math.min);

/**
 * Componentwise computes `Math.min` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const min = a;

/**
 * Componentwise computes `Math.min` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const min2 = b;

/**
 * Componentwise computes `Math.min` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const min3 = c;

/**
 * Componentwise computes `Math.min` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const min4 = d;
