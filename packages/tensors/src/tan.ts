// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d] = defOpT(Math.tan);

/**
 * Componentwise computes `Math.tan` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tan = a;

/**
 * Componentwise computes `Math.tan` of given 1D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tan1 = b;

/**
 * Componentwise computes `Math.tan` of given 2D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tan2 = c;

/**
 * Componentwise computes `Math.tan` of given 3D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const tan3 = d;
