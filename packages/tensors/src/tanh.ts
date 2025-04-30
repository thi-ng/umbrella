// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d, e] = defOpT(Math.tanh);

/**
 * Componentwise computes `Math.tanh` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tanh = a;

/**
 * Same as {@link tanh} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tanh1 = b;

/**
 * Same as {@link tanh} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tanh2 = c;

/**
 * Same as {@link tanh} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tanh3 = d;

/**
 * Same as {@link tanh} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tanh4 = e;
