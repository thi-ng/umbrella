// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.log);

/**
 * Componentwise computes `Math.log` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log = a;

/**
 * Componentwise computes `Math.log` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log_2 = b;

/**
 * Componentwise computes `Math.log` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log_3 = c;

/**
 * Componentwise computes `Math.log` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const log_4 = d;
