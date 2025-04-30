// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d, e] = defOpT(Math.tan);

/**
 * Componentwise computes `Math.tan` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tan = a;

/**
 * Same as {@link tan} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tan1 = b;

/**
 * Same as {@link tan} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tan2 = c;

/**
 * Same as {@link tan} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tan3 = d;

/**
 * Same as {@link tan} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tan4 = e;
