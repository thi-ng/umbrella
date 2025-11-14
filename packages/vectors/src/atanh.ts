// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.atanh);

/**
 * Componentwise computes `Math.atanh` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const atanh = a;

/**
 * Componentwise computes `Math.atanh` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const atanh_2 = b;

/**
 * Componentwise computes `Math.atanh` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const atanh_3 = c;

/**
 * Componentwise computes `Math.atanh` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const atanh_4 = d;
