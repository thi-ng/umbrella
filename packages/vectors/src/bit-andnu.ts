import { defOpVN } from "./defopvn.js";
import { $bandU } from "./ops.js";

const [a, b, c, d] = defOpVN($bandU);

/**
 * Componentwise binary AND of given nD unsigned integer vector and uniform
 * scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitAndNU = a;

/**
 * Componentwise binary AND of given 2D unsigned integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitAndNU2 = b;

/**
 * Componentwise binary AND of given 3D unsigned integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitAndNU3 = c;

/**
 * Componentwise binary AND of given 4D unsigned integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitAndNU4 = d;
