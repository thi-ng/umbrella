// SPDX-License-Identifier: Apache-2.0
import { defOpVVV } from "./defopvvv.js";
import { $msub } from "./ops.js";

const [a, b, c, d] = defOpVVV($msub);

/**
 * Componentwise nD vector multiply-subtract. `o = a * b - c`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const msub = a;

/**
 * Componentwise 2D vector multiply-subtract.
 * `o = a * b - c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const msub2 = b;

/**
 * Componentwise 3D vector multiply-subtract.
 * `o = a * b - c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const msub3 = c;

/**
 * Componentwise 4D vector multiply-subtract.
 * `o = a * b - c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const msub4 = d;
