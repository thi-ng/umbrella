// SPDX-License-Identifier: Apache-2.0
import { defOpSVN } from "./defopsvn.js";
import { $mul } from "./ops.js";

const [a, b, c, d] = defOpSVN($mul);

/**
 * Componentwise nD strided vector multiplication with uniform scalar.
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
export const mulNS = a;

/**
 * Componentwise 2D strided vector multiplication with uniform scalar.
 *
 * @param out - output vector
 * @param a - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const mulNS2 = b;

/**
 * Componentwise 3D strided vector multiplication with uniform scalar.
 *
 * @param out - output vector
 * @param a - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const mulNS3 = c;

/**
 * Componentwise 4D strided vector multiplication with uniform scalar.
 *
 * @param out - output vector
 * @param a - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const mulNS4 = d;
