// SPDX-License-Identifier: Apache-2.0
import { defOpTT } from "./defoptt.js";

/**
 * Componentwise computes `Math.min` of given nD tensors and writes result to
 * `out`. If `out` is null, mutates `a`. Supports broadcasting (see
 * {@link broadcast} for details).
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const min = defOpTT(Math.min);
