// SPDX-License-Identifier: Apache-2.0
import { defOpVN } from "./defopvn.js";
import { $add } from "./ops.js";

const [a, b, c, d] = defOpVN($add);

/**
 * Componentwise nD vector addition with a uniform scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addN = a;

/**
 * Componentwise 2D vector addition with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addN2 = b;

/**
 * Componentwise 3D vector addition with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addN3 = c;

/**
 * Componentwise 4D vector addition with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const addN4 = d;
