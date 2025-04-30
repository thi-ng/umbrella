// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

const [a, b, c, d, e] = defOpTN(Math.min);

/**
 * Componentwise computes `Math.min` of given nD tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const minN = a;

/**
 * Same as {@link minN} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const minN1 = b;

/**
 * Same as {@link minN} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const minN2 = c;

/**
 * Same as {@link minN} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const minN3 = d;

/**
 * Same as {@link minN} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const minN4 = e;
