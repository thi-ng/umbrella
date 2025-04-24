// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.log2);

/**
 * Componentwise computes `Math.log2` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log2 = a;

/**
 * Componentwise computes `Math.log2` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log2_2 = b;

/**
 * Componentwise computes `Math.log2` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log2_3 = c;

/**
 * Componentwise computes `Math.log2` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log2_4 = d;
