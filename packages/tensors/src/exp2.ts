// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d, e] = defOpT((x) => 2 ** x);

/**
 * Componentwise computes `2^x` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const exp2 = a;

/**
 * Same as {@link exp2} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const exp2_1 = b;

/**
 * Same as {@link exp2} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const exp2_2 = c;

/**
 * Same as {@link exp2} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const exp2_3 = d;

/**
 * Same as {@link exp2} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const exp2_4 = e;
