// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV((a) => 1 / a);

/**
 * Componentwise computes the reciprocal (1/x) of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invert = a;

/**
 * Componentwise computes the reciprocal (1/x) of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invert2 = b;

/**
 * Componentwise computes the reciprocal (1/x) of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invert3 = c;

/**
 * Componentwise computes the reciprocal (1/x) of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invert4 = d;
