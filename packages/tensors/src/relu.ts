// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

/**
 * Componentwise computes ReLU of given nD tensor and writes result to `out`. If
 * `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const relu = defOpT((x) => (x > 0 ? x : 0));
