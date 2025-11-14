// SPDX-License-Identifier: Apache-2.0
import { defOpVN } from "./defopvn.js";
import { $sub } from "./ops.js";

const [a, b, c, d] = defOpVN($sub);

/**
 * Componentwise nD vector subtraction with a uniform scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subN = a;

/**
 * Componentwise 2D vector subtraction with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subN2 = b;

/**
 * Componentwise 3D vector subtraction with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subN3 = c;

/**
 * Componentwise 4D vector subtraction with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const subN4 = d;
