// SPDX-License-Identifier: Apache-2.0
import { defOpTT } from "./defoptt.js";

const [a, b, c, d] = defOpTT(Math.pow);

/**
 * Componentwise computes `Math.pow` of given nD tensors and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const pow = a;

/**
 * Componentwise computes `Math.pow` of given 1D tensors and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const pow1 = b;

/**
 * Componentwise computes `Math.pow` of given 2D tensors and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const pow2 = c;

/**
 * Componentwise computes `Math.pow` of given 3D tensors and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const pow3 = d;
