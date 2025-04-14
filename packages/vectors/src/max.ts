import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV(Math.max);

/**
 * Componentwise computes `Math.max` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max = a;

/**
 * Componentwise computes `Math.max` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max2 = b;

/**
 * Componentwise computes `Math.max` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max3 = c;

/**
 * Componentwise computes `Math.max` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max4 = d;
