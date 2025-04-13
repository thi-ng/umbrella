import { defOpVN } from "./defopvn.js";
import { $addU } from "./ops.js";

const [a, b, c, d] = defOpVN($addU);

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
