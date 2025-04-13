import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => a << b);

/**
 * Componentwise binary left shift of given nD signed integer vector `a`.
 * Vector `b` contains the shift amounts. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const lshiftI = a;

/**
 * Componentwise binary left shift of given 2D signed integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const lshiftI2 = b;

/**
 * Componentwise binary left shift of given 3D signed integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const lshiftI3 = c;

/**
 * Componentwise binary left shift of given 4D signed integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const lshiftI4 = d;
