// SPDX-License-Identifier: Apache-2.0
import { defOpVN } from "./defopvn.js";
import { $bxorI } from "./ops.js";

const [a, b, c, d] = defOpVN($bxorI);

/**
 * Componentwise binary XOR of given nD signed integer vector and uniform
 * scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitXorNI = a;

/**
 * Componentwise binary XOR of given 2D signed integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitXorNI2 = b;

/**
 * Componentwise binary XOR of given 3D signed integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitXorNI3 = c;

/**
 * Componentwise binary XOR of given 4D signed integer vector and uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const bitXorNI4 = d;
