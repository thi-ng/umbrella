// SPDX-License-Identifier: Apache-2.0
import { defOpVN } from "./defopvn.js";
import { $lsI } from "./ops.js";

const [a, b, c, d] = defOpVN($lsI);

/**
 * Componentwise binary left shift of given nD signed integer vector by uniform
 * scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const lshiftNI = a;

/**
 * Componentwise binary left shift of given 2D signed integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const lshiftNI2 = b;

/**
 * Componentwise binary left shift of given 3D signed integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const lshiftNI3 = c;

/**
 * Componentwise binary left shift of given 4D signed integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const lshiftNI4 = d;
