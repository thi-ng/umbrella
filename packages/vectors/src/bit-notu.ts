// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV((a) => ~a >>> 0);

/**
 * Componentwise binary NOT of given nD unsigned integer vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitNotU = a;

/**
 * Componentwise binary NOT of given 2D unsigned integer vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitNotU2 = b;

/**
 * Componentwise binary NOT of given 3D unsigned integer vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitNotU3 = c;

/**
 * Componentwise binary NOT of given 4D unsigned integer vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitNotU4 = d;
