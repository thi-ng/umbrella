import { defOpVVN } from "./defopvvn.js";

const [a, b, c, d] = defOpVVN((a, b, n) => (a - b) * n);

/**
 * Componentwise nD vector sub-multiply. `o = (a - b) * n`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const submN = a;

/**
 * Componentwise 2D vector sub-multiply. `o = (a - b) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const submN2 = b;

/**
 * Componentwise 3D vector sub-multiply. `o = (a - b) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const submN3 = c;

/**
 * Componentwise 4D vector sub-multiply. `o = (a - b) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const submN4 = d;
