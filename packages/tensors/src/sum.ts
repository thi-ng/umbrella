// SPDX-License-Identifier: Apache-2.0
import { defOpRT } from "./defoprt.js";

/**
 * Componentwise sum of given nD tensor. Multi-method.
 *
 * @param a - input tensor
 */
export const sum = defOpRT(
	(acc, data, i) => acc + data[i],
	() => 0
);
