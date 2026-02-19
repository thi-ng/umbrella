// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import type { ITensor, ITensor1 } from "./api.js";
import { ensureShape } from "./errors.js";
import { sum } from "./sum.js";
import { Tensor1 } from "./tensor.js";

/**
 * Integrates given tensor along innermost dimension and writes result to 1D
 * tensor `out` (or creates new one).
 *
 * @remarks
 * The output tensor shape must match the innermost shape of the input: e.g. if
 * input shape is `[2,3,4]`, then the output tensor must have a shape of `[4]`.
 *
 * @example
 * ```ts tangle:../export/integrate.ts
 * import { integrate, print, product, sum, tensor } from "@thi.ng/tensors";
 *
 * const input = tensor([[1, 2], [10, 20], [100, 200]]);
 *
 * // integrate using `sum()` (also default)
 * // i.e. [1 + 10 + 100, 2 + 20 + 200]
 * print(integrate(null, input, sum));
 * //  111.0000  222.0000
 *
 * // integrate using `product()`
 * // i.e. [1 * 10 * 100, 2 * 20 * 200]
 * print(integrate(null, input, product));
 * // 1000.0000 8000.0000
 * ```
 *
 * @param out
 * @param a
 * @param fn
 */
export const integrate = (
	out: ITensor1 | null,
	a: ITensor,
	fn: Fn<ITensor, number> = sum
): ITensor1 => {
	const { shape, dim } = a;
	const odim = shape[shape.length - 1];
	if (!out) {
		out = new Tensor1(
			a.type,
			a.storage,
			a.storage.alloc(odim),
			[odim],
			[1]
		);
	}
	ensureShape(out, [odim]);
	const {
		data: odata,
		stride: [tx],
		offset: ox,
	} = out;
	const select = new Array(dim).fill(-1);
	for (let i = 0; i < odim; i++) {
		select[dim - 1] = i;
		odata[ox + i * tx] = fn(a.pick(select));
	}
	return out;
};
