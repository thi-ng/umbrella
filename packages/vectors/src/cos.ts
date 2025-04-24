// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.cos);

/**
 * Componentwise `Math.cos` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cos = a;

/**
 * Componentwise `Math.cos` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cos2 = b;

/**
 * Componentwise `Math.cos` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cos3 = c;

/**
 * Componentwise `Math.cos` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cos4 = d;
