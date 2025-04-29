// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d] = defOpT(Math.tanh);

/**
 * Componentwise computes `Math.tanh` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tanh = a;

/**
 * Componentwise computes `Math.tanh` of given 1D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tanh1 = b;

/**
 * Componentwise computes `Math.tanh` of given 2D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tanh2 = c;

/**
 * Componentwise computes `Math.tanh` of given 3D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tanh3 = d;
