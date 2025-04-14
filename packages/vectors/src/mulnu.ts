import { defOpVN } from "./defopvn.js";
import { $mulU } from "./ops.js";

const [a, b, c, d] = defOpVN($mulU);

/**
 * Componentwise nD unsigned integer vector multiplication with uniform scalar.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulNU = a;

/**
 * Componentwise 2D unsigned integer vector multiplication with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulNU2 = b;

/**
 * Componentwise 3D unsigned integer vector multiplication with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulNU3 = c;

/**
 * Componentwise 4D unsigned integer vector multiplication with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulNU4 = d;
