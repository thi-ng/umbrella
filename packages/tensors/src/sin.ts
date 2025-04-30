// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d, e] = defOpT(Math.sin);

/**
 * Componentwise computes `Math.sin` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sin = a;

/**
 * Same as {@link sin} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sin1 = b;

/**
 * Same as {@link sin} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sin2 = c;

/**
 * Same as {@link sin} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sin3 = d;

/**
 * Same as {@link sin} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sin4 = e;
