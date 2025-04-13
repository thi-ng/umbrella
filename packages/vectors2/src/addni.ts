import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN((a, n) => (a + n) | 0);

/**
 * Componentwise nD signed integer vector addition with uniform scalar.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addNI = a;

/**
 * Componentwise 2D signed integer vector addition with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addNI2 = b;

/**
 * Componentwise 3D signed integer vector addition with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addNI3 = c;

/**
 * Componentwise 4D signed integer vector addition with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addNI4 = d;
