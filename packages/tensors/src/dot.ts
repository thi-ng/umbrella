// SPDX-License-Identifier: Apache-2.0
import { defOpRTT } from "./defoprtt.js";

/**
 * Dot product of given nD tensors. Supports broadcasting (see {@link broadcast}
 * for details).
 *
 * @param a - input tensor
 * @param b - input tensor
 */
export const dot = defOpRTT(
	(acc, adata, bdata, ia, ib) => acc + adata[ia] * bdata[ib],
	() => 0
);
