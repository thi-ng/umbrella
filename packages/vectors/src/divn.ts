// SPDX-License-Identifier: Apache-2.0
import { defOpVN } from "./defopvn.js";
import { $div } from "./ops.js";

const [a, b, c, d] = defOpVN($div);

/**
 * Componentwise nD vector division with a uniform scalar. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divN = a;

/**
 * Componentwise 2D vector division with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divN2 = b;

/**
 * Componentwise 3D vector division with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divN3 = c;

/**
 * Componentwise 4D vector division with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divN4 = d;
