// SPDX-License-Identifier: Apache-2.0
import { defOpVNV } from "./defopvnv.js";
import { $msub } from "./ops.js";

const [a, b, c, d] = defOpVNV($msub);

/**
 * Componentwise nD vector multiply-sub with a uniform scalar factor.
 * `o = a * n - b`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const msubN = a;

/**
 * Componentwise 2D vector multiply-sub with a uniform scalar factor.
 * `o = a * n - b`
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const msubN2 = b;

/**
 * Componentwise 3D vector multiply-sub with a uniform scalar factor.
 * `o = a * n - b`
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const msubN3 = c;

/**
 * Componentwise 4D vector multiply-sub with a uniform scalar factor.
 * `o = a * n - b`
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 */
export const msubN4 = d;
