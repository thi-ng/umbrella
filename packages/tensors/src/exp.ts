// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d, e] = defOpT(Math.exp);

/**
 * Componentwise computes `Math.exp` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const exp = a;

/**
 * Same as {@link exp} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const exp_1 = b;

/**
 * Same as {@link exp} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const exp_2 = c;

/**
 * Same as {@link exp} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const exp_3 = d;

/**
 * Same as {@link exp} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const exp_4 = e;
