// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d, e] = defOpT((x) => (x > 0 ? x : 0));

/**
 * Componentwise computes ReLU of given nD tensor and writes result to `out`. If
 * `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const relu = a;

/**
 * Same as {@link relu} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const relu1 = b;

/**
 * Same as {@link relu} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const relu2 = c;

/**
 * Same as {@link relu} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const relu3 = d;

/**
 * Same as {@link relu} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const relu4 = e;
