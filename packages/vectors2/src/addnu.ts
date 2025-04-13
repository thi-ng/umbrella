import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN((a, n) => (a + n) >>> 0);

/**
 * Componentwise nD unsigned integer vector addition with uniform scalar.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addNU = a;

/**
 * Componentwise 2D unsigned integer vector addition with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addNU2 = b;

/**
 * Componentwise 3D unsigned integer vector addition with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addNU3 = c;

/**
 * Componentwise 4D unsigned integer vector addition with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addNU4 = d;
