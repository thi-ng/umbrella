import { defOpVN } from "./defopvn.js";
import { $borU } from "./ops.js";

const [a, b, c, d] = defOpVN($borU);

/**
 * Componentwise binary OR of given nD unsigned integer vector and uniform
 * scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNU = a;

/**
 * Componentwise binary OR of given 2D unsigned integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNU2 = b;

/**
 * Componentwise binary OR of given 3D unsigned integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNU3 = c;

/**
 * Componentwise binary OR of given 4D unsigned integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNU4 = d;
