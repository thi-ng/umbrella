import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.sign);

/**
 * Componentwise computes `Math.sign` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sign = a;

/**
 * Componentwise computes `Math.sign` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sign2 = b;

/**
 * Componentwise computes `Math.sign` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sign3 = c;

/**
 * Componentwise computes `Math.sign` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sign4 = d;
