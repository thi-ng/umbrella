import { defOpVN, defOpVV } from "./defop.js";

/**
 * Componentwise `Math.pow` of given 3D vector `a`. Vector `b` contains
 * exponents.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const pow3 = defOpVV(Math.pow);

/**
 * Componentwise `Math.pow` of given 3D vector and uniform scalar exponent.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const powN3 = defOpVN(Math.pow);
