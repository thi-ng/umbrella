// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV((a) => ~a);

/**
 * Componentwise binary NOT of given nD signed integer vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitNotI = a;

/**
 * Componentwise binary NOT of given 2D signed integer vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitNotI2 = b;

/**
 * Componentwise binary NOT of given 3D signed integer vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitNotI3 = c;

/**
 * Componentwise binary NOT of given 4D signed integer vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitNotI4 = d;
