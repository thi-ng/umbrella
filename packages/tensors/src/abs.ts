// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d, e] = defOpT(Math.abs);

/**
 * Componentwise computes `Math.abs` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const abs = a;

/**
 * Same as {@link abs} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const abs1 = b;

/**
 * Same as {@link abs} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const abs2 = c;

/**
 * Same as {@link abs} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const abs3 = d;

/**
 * Same as {@link abs} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const abs4 = e;
