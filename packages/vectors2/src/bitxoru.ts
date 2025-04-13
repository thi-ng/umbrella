import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => (a ^ b) >>> 0);

/**
 * Componentwise binary XOR of given nD unsigned integer vectors. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitXorU = a;

/**
 * Componentwise binary XOR of given 2D unsigned integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitXorU2 = b;

/**
 * Componentwise binary XOR of given 3D unsigned integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitXorU3 = c;

/**
 * Componentwise binary XOR of given 4D unsigned integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitXorU4 = d;
