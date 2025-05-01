// SPDX-License-Identifier: Apache-2.0
import { defOpTT } from "./defoptt.js";

const [a, b, c, d, e] = defOpTT(Math.pow);

/**
 * Componentwise computes `Math.pow` of given nD tensors and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (exponent)
 */
export const pow = a;

/**
 * Same as {@link pow} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (exponent)
 */
export const pow1 = b;

/**
 * Same as {@link pow} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (exponent)
 */
export const pow2 = c;

/**
 * Same as {@link pow} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (exponent)
 */
export const pow3 = d;

/**
 * Same as {@link pow} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (exponent)
 */
export const pow4 = e;
