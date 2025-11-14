// SPDX-License-Identifier: Apache-2.0
import { defOpRT } from "./defoprt.js";

/**
 * Componentwise product of given nD tensor. Multi-method.
 *
 * @param a - input tensor
 */
export const product = defOpRT(
	(acc, data, i) => acc * data[i],
	() => 1
);
