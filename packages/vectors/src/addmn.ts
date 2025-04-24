// SPDX-License-Identifier: Apache-2.0
import { defOpVVN } from "./defopvvn.js";
import { $addm } from "./ops.js";

const [a, b, c, d] = defOpVVN($addm);

/**
 * Componentwise nD vector add-multiply. `o = (a + b) * n`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const addmN = a;

/**
 * Componentwise 2D vector add-multiply. `o = (a + b) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const addmN2 = b;

/**
 * Componentwise 3D vector add-multiply. `o = (a + b) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const addmN3 = c;

/**
 * Componentwise 4D vector add-multiply. `o = (a + b) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const addmN4 = d;
