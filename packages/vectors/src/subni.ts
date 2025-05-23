// SPDX-License-Identifier: Apache-2.0
import { defOpVN } from "./defopvn.js";
import { $subI } from "./ops.js";

const [a, b, c, d] = defOpVN($subI);

/**
 * Componentwise nD signed integer vector subtraction with uniform scalar.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subNI = a;

/**
 * Componentwise 2D signed integer vector subtraction with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subNI2 = b;

/**
 * Componentwise 3D signed integer vector subtraction with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subNI3 = c;

/**
 * Componentwise 4D signed integer vector subtraction with uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subNI4 = d;
