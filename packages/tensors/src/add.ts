// SPDX-License-Identifier: Apache-2.0
import { $add } from "@thi.ng/vectors/ops";
import { defOpTT } from "./defoptt.js";

/**
 * Componentwise nD tensor addition. Writes result to `out`. If `out` is null,
 * creates a new tensor using `a`'s type and storage provider and shape as
 * determined by broadcasting rules (see {@link broadcast} for details).
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const add = defOpTT($add);
