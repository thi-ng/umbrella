// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

const { exp, log } = Math;

const [a, b, c, d] = defOpTN((x, k) => log(1 + exp(x * k)) / k);

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
export const softPlus = a;

/**
 * Same as {@link softPlus} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - sharpness
 */
export const softPlus1 = b;

/**
 * Same as {@link softPlus} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - sharpness
 */
export const softPlus2 = c;

/**
 * Same as {@link softPlus} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - sharpness
 */
export const softPlus3 = d;
