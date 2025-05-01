// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

/**
 * Componentwise computes `Math.min` of given nD tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const minN = defOpTN(Math.min);
