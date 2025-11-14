// SPDX-License-Identifier: Apache-2.0
import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV<boolean>((a, b) => a || b);

/**
 * Componentwise logical OR of given nD boolean vectors. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicOr = a;

/**
 * Componentwise logical OR of given 2D boolean vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicOr2 = b;

/**
 * Componentwise logical OR of given 3D boolean vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicOr3 = c;

/**
 * Componentwise logical OR of given 4D boolean vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicOr4 = d;
