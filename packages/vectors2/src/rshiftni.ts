import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN((a, n) => a >> n);

/**
 * Componentwise binary right shift of given nD signed integer vector by uniform
 * scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const rshiftNI = a;

/**
 * Componentwise binary right shift of given 2D signed integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const rshiftNI2 = b;

/**
 * Componentwise binary right shift of given 3D signed integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const rshiftNI3 = c;

/**
 * Componentwise binary right shift of given 4D signed integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const rshiftNI4 = d;
