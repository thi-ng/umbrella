import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN((a, n) => (a ^ n) >>> 0);

/**
 * Componentwise binary XOR of given nD unsigned integer vector and uniform
 * scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitXorNU = a;

/**
 * Componentwise binary XOR of given 2D unsigned integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitXorNU2 = b;

/**
 * Componentwise binary XOR of given 3D unsigned integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitXorNU3 = c;

/**
 * Componentwise binary XOR of given 4D unsigned integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitXorNU4 = d;
