// SPDX-License-Identifier: Apache-2.0
import { $mul } from "@thi.ng/vectors/ops";
import { defOpTN } from "./defoptn.js";

/**
 * Componentwise nD tensor multiplication with uniform scalar `n`. Writes result
 * to `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mulN = defOpTN($mul);
