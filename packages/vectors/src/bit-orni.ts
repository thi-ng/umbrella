// SPDX-License-Identifier: Apache-2.0
import { defOpVN } from "./defopvn.js";
import { $borI } from "./ops.js";

const [a, b, c, d] = defOpVN($borI);

/**
 * Componentwise binary OR of given nD signed integer vector and uniform
 * scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNI = a;

/**
 * Componentwise binary OR of given 2D signed integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNI2 = b;

/**
 * Componentwise binary OR of given 3D signed integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNI3 = c;

/**
 * Componentwise binary OR of given 4D signed integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitOrNI4 = d;
