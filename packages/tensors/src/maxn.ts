// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

const [a, b, c, d, e] = defOpTN(Math.max);

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
 * Same as {@link maxN} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const maxN1 = b;

/**
 * Same as {@link maxN} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const maxN2 = c;

/**
 * Same as {@link maxN} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const maxN3 = d;

/**
 * Same as {@link maxN} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const maxN4 = e;
