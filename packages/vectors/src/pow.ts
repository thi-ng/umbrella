import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV(Math.pow);

/**
 * Componentwise `Math.pow` of given nD vector `a`. Vector `b` contains
 * exponents. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const pow = a;

/**
 * Componentwise `Math.pow` of given 2D vector `a`. Vector `b` contains
 * exponents.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const pow2 = b;

/**
 * Componentwise `Math.pow` of given 3D vector `a`. Vector `b` contains
 * exponents.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const pow3 = c;

/**
 * Componentwise `Math.pow` of given 4D vector `a`. Vector `b` contains
 * exponents.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const pow4 = d;
