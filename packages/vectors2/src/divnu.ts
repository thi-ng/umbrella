import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN((a, n) => (a / n) >>> 0);

/**
 * Componentwise nD unsigned integer vector division with uniform scalar.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divNU = a;

/**
 * Componentwise 2D unsigned integer vector division with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divNU2 = b;

/**
 * Componentwise 3D unsigned integer vector division with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divNU3 = c;

/**
 * Componentwise 4D unsigned integer vector division with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divNU4 = d;
