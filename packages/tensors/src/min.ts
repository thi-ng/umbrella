// SPDX-License-Identifier: Apache-2.0
import { defOpTT } from "./defoptt.js";

const [a, b, c, d] = defOpTT(Math.min);

/**
 * Componentwise computes `Math.min` of given nD tensors and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const min = a;

/**
 * Componentwise computes `Math.min` of given 1D tensors and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const min1 = b;

/**
 * Componentwise computes `Math.min` of given 2D tensors and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const min2 = c;

/**
 * Componentwise computes `Math.min` of given 3D tensors and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const min3 = d;
