// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

const [a, b, c, d, e] = defOpTN((x, n) => (x >= 0 ? x : x * n));

/**
 * Componentwise computes leaky ReLU of given nD tensor (using slope `n` for
 * negative inputs) and writes result to `out`. If `out` is null, mutates
 * original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - slope
 */
export const reluN = a;

/**
 * Same as {@link reluN} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - slope
 */
export const reluN1 = b;

/**
 * Same as {@link reluN} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - slope
 */
export const reluN2 = c;

/**
 * Same as {@link reluN} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - slope
 */
export const reluN3 = d;

/**
 * Same as {@link reluN} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - slope
 */
export const reluN4 = e;
