// SPDX-License-Identifier: Apache-2.0
import type { ITensor1 } from "./api.js";
import { ensureShape } from "./errors.js";

/**
 * Computes the cumulative distribution of `a` and writes it to `out`. If `out`
 * is null, mutates `a` in place.
 *
 * @remarks
 * Reference:
 *
 * - https://en.wikipedia.org/wiki/Cumulative_distribution_function
 *
 * @example
 * ```ts tangle:../export/cdf.ts
 * import { cdf, tensor } from "@thi.ng/tensors";
 *
 * const a = tensor("num", [10], {data: [0,0,1,0,0,1,0,1,1,0]});
 *
 * console.log([...cdf(null, a)]);
 * // [ 0, 0, 1, 1, 1, 2, 2, 3, 4, 4 ]
 * ```
 *
 * @param out
 * @param a
 */
export const cdf = (out: ITensor1 | null, a: ITensor1) => {
	!out && (out = a);
	ensureShape(out, a.shape);
	const {
		offset: oa,
		shape: [sa],
		stride: [ta],
		data: adata,
	} = a;
	const {
		offset: oo,
		stride: [to],
		data: odata,
	} = out;
	let total = 0;
	for (let i = 0; i < sa; i++) {
		total += adata[oa + i * ta];
		odata[oo + i * to] = total;
	}
	return out;
};
