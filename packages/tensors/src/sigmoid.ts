// SPDX-License-Identifier: Apache-2.0
import { defOpT } from "./defopt.js";

const { exp } = Math;

/**
 * Componentwise computes Sigmoid activation of given nD tensor. Writes result
 * to `out`. If `out` is null, mutates original. Multi-method.
 *
 * Reference: https://en.wikipedia.org/wiki/Sigmoid_function
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sigmoid = defOpT((x) => 1 / (1 + exp(-x)));
