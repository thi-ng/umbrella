import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN((a, b) => a * b);

/**
 * Componentwise nD vector multiplication with a uniform scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulN = a;

/**
 * Componentwise 2D vector multiplication with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulN2 = b;

/**
 * Componentwise 3D vector multiplication with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulN3 = c;

/**
 * Componentwise 4D vector multiplication with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulN4 = d;
