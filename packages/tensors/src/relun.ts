// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

/**
 * Componentwise computes leaky ReLU of given nD tensor (using slope `n` for
 * negative inputs) and writes result to `out`. If `out` is null, mutates
 * original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - slope
 */
export const reluN = defOpTN((x, n) => (x >= 0 ? x : x * n));
