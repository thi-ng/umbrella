// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d, e] = defOpT(Math.cos);

/**
 * Componentwise computes `Math.cos` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const cos = a;

/**
 * Same as {@link cos} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const cos1 = b;

/**
 * Same as {@link cos} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const cos2 = c;

/**
 * Same as {@link cos} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const cos3 = d;

/**
 * Same as {@link cos} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const cos4 = e;
