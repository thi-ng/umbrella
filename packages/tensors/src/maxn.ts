// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

const [a, b, c, d] = defOpTN(Math.max);

/**
 * Componentwise computes `Math.max` of given nD tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const maxN = a;

/**
 * Componentwise computes `Math.max` of given 1D tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const maxN1 = b;

/**
 * Componentwise computes `Math.max` of given 2D tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const maxN2 = c;

/**
 * Componentwise computes `Math.max` of given 3D tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const maxN3 = d;
