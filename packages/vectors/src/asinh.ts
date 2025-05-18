// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.asinh);

/**
 * Componentwise computes `Math.asinh` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asinh = a;

/**
 * Componentwise computes `Math.asinh` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asinh2 = b;

/**
 * Componentwise computes `Math.asinh` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asinh3 = c;

/**
 * Componentwise computes `Math.asinh` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asinh4 = d;
