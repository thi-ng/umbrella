// SPDX-License-Identifier: Apache-2.0
import { $add } from "@thi.ng/vectors/ops";
import { defOpRT } from "./defoprt.js";

/**
 * Componentwise sum of given nD tensor. Multi-method.
 *
 * @param a - input tensor
 */
export const sum = defOpRT($add, () => 0);
