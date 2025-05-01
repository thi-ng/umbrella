// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

const { exp, log } = Math;

/**
 * Componentwise computes Softplus activation of given nD tensor with given `k`
 * (sharpness param, should be >= 1). Writes result to `out`. If `out` is null,
 * mutates original. Multi-method.
 *
 * @remarks
 *
 * - Reference: https://en.wikipedia.org/wiki/Softplus
 * - Interactive calculator: https://www.desmos.com/calculator/54pfflbsbv
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - sharpness
 */
export const softPlus = defOpTN((x, k) => log(1 + exp(x * k)) / k);
