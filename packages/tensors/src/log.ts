// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d, e] = defOpT(Math.log);

/**
 * Componentwise computes `Math.log` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log = a;

/**
 * Same as {@link log} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log_1 = b;

/**
 * Same as {@link log} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log_2 = c;

/**
 * Same as {@link log} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log_3 = d;

/**
 * Same as {@link log} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log_4 = e;
