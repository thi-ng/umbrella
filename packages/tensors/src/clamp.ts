// SPDX-License-Identifier: Apache-2.0
import { clamp as op } from "@thi.ng/math/interval";
import { defOpTTT } from "./defopttt.js";

/**
 * Componentwise clamps nD tensor `a` to closed interval defined by `[b,c]`.
 * Writes result to `out`. If `out` is null, creates a new tensor using `a`'s
 * type and storage provider and shape as determined by broadcasting rules (see
 * {@link broadcast} for details).
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (min)
 * @param c - input tensor (max)
 */
export const clamp = defOpTTT(op);
