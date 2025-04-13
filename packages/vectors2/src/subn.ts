import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN((a, b) => a - b);

/**
 * Componentwise nD vector subtraction with a uniform scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subN = a;

/**
 * Componentwise 2D vector subtraction with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subN2 = b;

/**
 * Componentwise 3D vector subtraction with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subN3 = c;

/**
 * Componentwise 4D vector subtraction with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subN4 = d;
