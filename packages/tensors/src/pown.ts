// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

/**
 * Componentwise computes `Math.pow` of given nD tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar exponent
 */
export const powN = defOpTN(Math.pow);
