// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d] = defOpT(Math.log);

/**
 * Componentwise computes `Math.log` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log = a;

/**
 * Componentwise computes `Math.log` of given 1D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log_1 = b;

/**
 * Componentwise computes `Math.log` of given 2D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log_2 = c;

/**
 * Componentwise computes `Math.log` of given 3D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const log_3 = d;
