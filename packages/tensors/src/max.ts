// SPDX-License-Identifier: Apache-2.0
import { defOpTT } from "./defoptt.js";

/**
 * Componentwise computes `Math.max` of given nD tensors and writes result to
 * `out`. If `out` is null, creates a new tensor using `a`'s type and storage
 * provider and shape as determined by broadcasting rules (see {@link broadcast}
 * for details).
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const max = defOpTT(Math.max);
