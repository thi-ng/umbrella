// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.cosh);

/**
 * Componentwise `Math.cosh` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cosh = a;

/**
 * Componentwise `Math.cosh` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cosh2 = b;

/**
 * Componentwise `Math.cosh` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cosh3 = c;

/**
 * Componentwise `Math.cosh` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const cosh4 = d;
