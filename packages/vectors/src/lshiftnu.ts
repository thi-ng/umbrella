// SPDX-License-Identifier: Apache-2.0
import { defOpVN } from "./defopvn.js";
import { $lsU } from "./ops.js";

const [a, b, c, d] = defOpVN($lsU);

/**
 * Componentwise binary left shift of given nD unsigned integer vector by uniform
 * scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const lshiftNU = a;

/**
 * Componentwise binary left shift of given 2D unsigned integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const lshiftNU2 = b;

/**
 * Componentwise binary left shift of given 3D unsigned integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const lshiftNU3 = c;

/**
 * Componentwise binary left shift of given 4D unsigned integer vector by uniform
 * scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const lshiftNU4 = d;
