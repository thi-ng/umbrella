// SPDX-License-Identifier: Apache-2.0
import type { ITensor } from "./api.js";
import { defOpRTT } from "./defoprtt.js";

const $swap = defOpRTT<any, void>(
	(_, adata, bdata, ia, ib) => {
		const t = adata[ia];
		adata[ia] = bdata[ib];
		bdata[ib] = t;
	},
	() => {},
	false
);

/**
 * Swaps all data value of the two given tensors (which must have same shape).
 * Returns `a`.
 *
 * @remarks
 * Combined with {@link ITensor.pick}, this can be used to swap
 * columns/rows/slices of a shared parent tensor.
 *
 * ```ts tangle:../export/swap.ts
 * import { swap, range, print } from "@thi.ng/tensors";
 *
 * const a = range(12).reshape([3,4]);
 * print(a);
 *
 * // swap data from 1st & 3rd column
 * swap(a.pick([-1,0]), a.pick([-1,2]));
 *
 * print(a);
 * ```
 *
 * @param a
 * @param b
 */
export const swap = <A, TA extends ITensor<A>>(a: TA, b: TA): TA =>
	<any>$swap(a, b);
