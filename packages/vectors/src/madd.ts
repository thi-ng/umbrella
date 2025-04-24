// SPDX-License-Identifier: Apache-2.0
import { defOpVVV } from "./defopvvv.js";
import { $madd } from "./ops.js";

const [a, b, c, d] = defOpVVV($madd);

/**
 * Componentwise nD vector multiply-add. `o = a * b + c`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const madd = a;

/**
 * Componentwise 2D vector multiply-add.
 * `o = a * b + c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const madd2 = b;

/**
 * Componentwise 3D vector multiply-add.
 * `o = a * b + c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const madd3 = c;

/**
 * Componentwise 4D vector multiply-add.
 * `o = a * b + c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const madd4 = d;
