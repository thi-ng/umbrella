// SPDX-License-Identifier: Apache-2.0
import { defOpSVVN } from "./defopsvvn.js";
import { $subm } from "./ops.js";

const [a, b, c, d] = defOpSVVN($subm);

/**
 * Componentwise nD strided vector subtract-multiply with uniform scalar.
 * `o = (a - b) * n`
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 * @param size - vector size
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 */
export const submNS = a;

/**
 * Componentwise 2D strided vector subtract-multiply with uniform scalar.
 * `o = (a - b) * n`
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 */
export const submNS2 = b;

/**
 * Componentwise 3D strided vector subtract-multiply with uniform scalar.
 * `o = (a - b) * n`
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 */
export const submNS3 = c;

/**
 * Componentwise 4D strided vector subtract-multiply with uniform scalar.
 * `o = (a - b) * n`
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 */
export const submNS4 = d;
