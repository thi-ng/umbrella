// SPDX-License-Identifier: Apache-2.0
import { defOpRT } from "./defoprt.js";

/**
 * Squared magnitude of given nD tensor. Multi-method.
 *
 * @param a - input tensor
 */
export const magSq = defOpRT(
	(acc, data, i) => acc + data[i] ** 2,
	() => 0
);
