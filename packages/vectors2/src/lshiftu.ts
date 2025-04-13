import { defOpVV } from "./defopvv.js";
import { $lsU } from "./ops.js";

const [a, b, c, d] = defOpVV($lsU);

/**
 * Componentwise binary left shift of given nD unsigned integer vector `a`.
 * Vector `b` contains the shift amounts. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const lshiftU = a;

/**
 * Componentwise binary left shift of given 2D unsigned integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const lshiftU2 = b;

/**
 * Componentwise binary left shift of given 3D unsigned integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const lshiftU3 = c;

/**
 * Componentwise binary left shift of given 4D unsigned integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const lshiftU4 = d;
