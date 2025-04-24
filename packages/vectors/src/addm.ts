// SPDX-License-Identifier: Apache-2.0
import { defOpVVV } from "./defopvvv.js";
import { $addm } from "./ops.js";

const [a, b, c, d] = defOpVVV($addm);

/**
 * Componentwise nD vector add-multiply. `o = (a + b) * c`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const addm = a;

/**
 * Componentwise 2D vector add-multiply. `o = (a + b) * c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const addm2 = b;

/**
 * Componentwise 3D vector add-multiply. `o = (a + b) * c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const addm3 = c;

/**
 * Componentwise 4D vector add-multiply. `o = (a + b) * c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const addm4 = d;
