// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d, e] = defOpT(Math.log2);

/**
 * Componentwise computes `Math.log2` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log2 = a;

/**
 * Same as {@link log2} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log2_1 = b;

/**
 * Same as {@link log2} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log2_2 = c;

/**
 * Same as {@link log2} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log2_3 = d;

/**
 * Same as {@link log2} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log2_4 = e;
