import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => a >>> b);

/**
 * Componentwise binary rightshift of given nD unsigned integer vector `a`.
 * Vector `b` contains the shift amounts. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const rshiftU = a;

/**
 * Componentwise binary right shift of given 2D unsigned integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const rshiftU2 = b;

/**
 * Componentwise binary right shift of given 3D unsigned integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const rshiftU3 = c;

/**
 * Componentwise binary right shift of given 4D unsigned integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const rshiftU4 = d;
