// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.sinh);

/**
 * Componentwise computes `Math.sinh` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sinh = a;

/**
 * Componentwise computes `Math.sinh` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sinh2 = b;

/**
 * Componentwise computes `Math.sinh` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sinh3 = c;

/**
 * Componentwise computes `Math.sinh` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sinh4 = d;
