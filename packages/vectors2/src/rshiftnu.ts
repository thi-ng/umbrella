import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN((a, n) => a >>> n);

/**
 * Componentwise binary right shift of given nD unsigned integer vector by uniform
 * scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const rshiftNU = a;

/**
 * Componentwise binary right shift of given 2D unsigned integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const rshiftNU2 = b;

/**
 * Componentwise binary right shift of given 3D unsigned integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const rshiftNU3 = c;

/**
 * Componentwise binary right shift of given 4D unsigned integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const rshiftNU4 = d;
