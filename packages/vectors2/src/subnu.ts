import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN((a, b) => (a - b) >>> 0);

/**
 * Componentwise nD unsigned integer vector subtraction with uniform scalar.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subNU = a;

/**
 * Componentwise 2D unsigned integer vector subtraction with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subNU2 = b;

/**
 * Componentwise 3D unsigned integer vector subtraction with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subNU3 = c;

/**
 * Componentwise 4D unsigned integer vector subtraction with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subNU4 = d;
