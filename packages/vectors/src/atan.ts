// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.atan);

/**
 * Componentwise computes `Math.atan` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const atan = a;

/**
 * Componentwise computes `Math.atan` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const atan_2 = b;

/**
 * Componentwise computes `Math.atan` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const atan_3 = c;

/**
 * Componentwise computes `Math.atan` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const atan_4 = d;
