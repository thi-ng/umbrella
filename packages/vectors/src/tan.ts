// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.tan);

/**
 * Componentwise computes `Math.tan` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tan = a;

/**
 * Componentwise computes `Math.tan` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tan2 = b;

/**
 * Componentwise computes `Math.tan` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tan3 = c;

/**
 * Componentwise computes `Math.tan` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tan4 = d;
