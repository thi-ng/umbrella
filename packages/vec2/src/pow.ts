import { defOpVN, defOpVV } from "./defop.js";

/**
 * Componentwise `Math.pow` of given 2D vector `a`. Vector `b` contains
 * exponents.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const pow2 = defOpVV(Math.pow);

/**
 * Componentwise `Math.pow` of given 2D vector and uniform scalar exponent.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const powN2 = defOpVN(Math.pow);
