import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN(Math.pow);

/**
 * Componentwise `Math.pow` of given nD vector `a` and uniform scalar exponent.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const powN = a;

/**
 * Componentwise `Math.pow` of given 2D vector `a` and uniform scalar exponent.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const powN2 = b;

/**
 * Componentwise `Math.pow` of given 3D vector `a` and uniform scalar exponent.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const powN3 = c;

/**
 * Componentwise `Math.pow` of given 4D vector `a` and uniform scalar exponent.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const powN4 = d;
