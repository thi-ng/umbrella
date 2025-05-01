// SPDX-License-Identifier: Apache-2.0
import { $mul } from "@thi.ng/vectors/ops";
import { defOpRT } from "./defoprt.js";

/**
 * Componentwise product of given nD tensor. Multi-method.
 *
 * @param a - input tensor
 */
export const product = defOpRT($mul, () => 1);
