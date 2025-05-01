// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

/**
 * Componentwise computes `Math.sin` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sin = defOpT(Math.sin);
