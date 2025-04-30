// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d, e] = defOpT(Math.sqrt);

/**
 * Componentwise computes `Math.sqrt` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sqrt = a;

/**
 * Same as {@link sqrt} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sqrt1 = b;

/**
 * Same as {@link sqrt} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sqrt2 = c;

/**
 * Same as {@link sqrt} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sqrt3 = d;

/**
 * Same as {@link sqrt} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sqrt4 = e;
