import { defOpVN } from "./defopvn.js";
import { $bandI } from "./ops.js";

const [a, b, c, d] = defOpVN($bandI);

/**
 * Componentwise binary AND of given nD signed integer vector and uniform
 * scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitAndNI = a;

/**
 * Componentwise binary AND of given 2D signed integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitAndNI2 = b;

/**
 * Componentwise binary AND of given 3D signed integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitAndNI3 = c;

/**
 * Componentwise binary AND of given 4D signed integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitAndNI4 = d;
