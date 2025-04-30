// SPDX-License-Identifier: Apache-2.0
import { defOpTT } from "./defoptt.js";

const [a, b, c, d, e] = defOpTT(Math.max);

/**
 * Componentwise computes `Math.max` of given nD tensors and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const max = a;

/**
 * Same as {@link max} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const max1 = b;

/**
 * Same as {@link max} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const max2 = c;

/**
 * Same as {@link max} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const max3 = d;

/**
 * Same as {@link max} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const max4 = e;
