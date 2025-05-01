// SPDX-License-Identifier: Apache-2.0
import { $sub } from "@thi.ng/vectors/ops";
import { defOpTT } from "./defoptt.js";

/**
 * Componentwise nD tensor subtraction. Writes result to `out`. If `out` is
 * null, mutates `a`. Supports broadcasting (see {@link broadcast} for details).
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const sub = defOpTT($sub);
