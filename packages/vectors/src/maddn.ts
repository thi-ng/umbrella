// SPDX-License-Identifier: Apache-2.0
import { defOpVNV } from "./defopvnv.js";
import { $madd } from "./ops.js";

const [a, b, c, d] = defOpVNV($madd);

/**
 * Componentwise nD vector multiply-add with a uniform scalar factor.
 * `o = a * n + b`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const maddN = a;

/**
 * Componentwise 2D vector multiply-add with a uniform scalar factor.
 * `o = a * n + b`
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const maddN2 = b;

/**
 * Componentwise 3D vector multiply-add with a uniform scalar factor.
 * `o = a * n + b`
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const maddN3 = c;

/**
 * Componentwise 4D vector multiply-add with a uniform scalar factor.
 * `o = a * n + b`
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const maddN4 = d;
