import { defOpVVN } from "./defopvvn.js";

const [a, b, c, d] = defOpVVN((a, b, n) => (a - b) * n);

/**
 * Componentwise nD vector add-multiply. `o = (a + b) * n`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const addmN = a;

/**
 * Componentwise 2D vector add-multiply. `o = (a + b) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const addmN2 = b;

/**
 * Componentwise 3D vector add-multiply. `o = (a + b) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const addmN3 = c;

/**
 * Componentwise 4D vector add-multiply. `o = (a + b) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const addmN4 = d;
