// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const [a, b, c, d] = defOpT((x) => (x > 0 ? x : 0));

/**
 * Componentwise computes ReLU of given nD tensor and writes result to `out`. If
 * `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const relu = a;

/**
 * Componentwise computes ReLU of given 1D tensor and writes result to `out`. If
 * `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const relu1 = b;

/**
 * Componentwise computes ReLU of given 2D tensor and writes result to `out`. If
 * `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const relu2 = c;

/**
 * Componentwise computes ReLU of given 3D tensor and writes result to `out`. If
 * `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const relu3 = d;
