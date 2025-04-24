// SPDX-License-Identifier: Apache-2.0
import { defOpSVN } from "./defopsvn.js";
import { $sub } from "./ops.js";

const [a, b, c, d] = defOpSVN($sub);

/**
 * Componentwise nD strided vector subtraction with uniform scalar.
 *
 * @param out - output vector
 * @param a - input vector
 * @param n - scalar
 * @param size - vector size
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const subNS = a;

/**
 * Componentwise 2D strided vector subtraction with uniform scalar.
 *
 * @param out - output vector
 * @param a - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const subNS2 = b;

/**
 * Componentwise 3D strided vector subtraction with uniform scalar.
 *
 * @param out - output vector
 * @param a - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const subNS3 = c;

/**
 * Componentwise 4D strided vector subtraction with uniform scalar.
 *
 * @param out - output vector
 * @param a - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const subNS4 = d;
