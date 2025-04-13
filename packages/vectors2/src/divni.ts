import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN((a, n) => (a / n) | 0);

/**
 * Componentwise nD signed integer vector division with uniform scalar.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divNI = a;

/**
 * Componentwise 2D signed integer vector division with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divNI2 = b;

/**
 * Componentwise 3D signed integer vector division with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divNI3 = c;

/**
 * Componentwise 4D signed integer vector division with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divNI4 = d;
