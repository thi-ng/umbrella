// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.exp);

/**
 * Componentwise computes `Math.exp` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp = a;

/**
 * Componentwise computes `Math.exp` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp_2 = b;

/**
 * Componentwise computes `Math.exp` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp_3 = c;

/**
 * Componentwise computes `Math.exp` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp_4 = d;
