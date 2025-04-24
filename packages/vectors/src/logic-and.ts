// SPDX-License-Identifier: Apache-2.0
import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV<boolean>((a, b) => a && b);

/**
 * Componentwise logical AND of given nD boolean vectors. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicAnd = a;

/**
 * Componentwise logical AND of given 2D boolean vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicAnd2 = b;

/**
 * Componentwise logical AND of given 3D boolean vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicAnd3 = c;

/**
 * Componentwise logical AND of given 4D boolean vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const logicAnd4 = d;
