// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.acosh);

/**
 * Componentwise computes `Math.acosh` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acosh = a;

/**
 * Componentwise computes `Math.acosh` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acosh2 = b;

/**
 * Componentwise computes `Math.acosh` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acosh3 = c;

/**
 * Componentwise computes `Math.acosh` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acosh4 = d;
