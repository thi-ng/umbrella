// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d] = defOpT(Math.cos);

/**
 * Componentwise computes `Math.cos` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const cos = a;

/**
 * Componentwise computes `Math.cos` of given 1D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const cos1 = b;

/**
 * Componentwise computes `Math.cos` of given 2D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const cos2 = c;

/**
 * Componentwise computes `Math.cos` of given 3D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const cos3 = d;
