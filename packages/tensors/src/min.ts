// SPDX-License-Identifier: Apache-2.0
import { defOpTT } from "./defoptt.js";

const [a, b, c, d, e] = defOpTT(Math.min);

/**
 * Componentwise computes `Math.min` of given nD tensors and writes result to
 * `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const min = a;

/**
 * Same as {@link min} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const min1 = b;

/**
 * Same as {@link min} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const min2 = c;

/**
 * Same as {@link min} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const min3 = d;

/**
 * Same as {@link min} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const min4 = e;
