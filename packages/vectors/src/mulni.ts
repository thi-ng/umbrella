// SPDX-License-Identifier: Apache-2.0
import { defOpVN } from "./defopvn.js";
import { $mulI } from "./ops.js";

const [a, b, c, d] = defOpVN($mulI);

/**
 * Componentwise nD signed integer vector multiplication with uniform scalar.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulNI = a;

/**
 * Componentwise 2D signed integer vector multiplication with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulNI2 = b;

/**
 * Componentwise 3D signed integer vector multiplication with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulNI3 = c;

/**
 * Componentwise 4D signed integer vector multiplication with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const mulNI4 = d;
