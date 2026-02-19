// SPDX-License-Identifier: Apache-2.0
import type { ITensor1, ITensor2 } from "./api.js";
import { illegalShape } from "./errors.js";
import { tensor } from "./tensor.js";

/**
 * Matrix-vector multiplication. If `out` is null, a new 1D tensor will be
 * created, using vector `b`'s type and storage impl.
 *
 * @param out
 * @param a
 * @param b
 */
export const mulV = (out: ITensor1 | null, a: ITensor2, b: ITensor1) => {
	const {
		data: adata,
		offset: oa,
		shape: [sxa, sya],
		stride: [txa, tya],
	} = a;
	const {
		data: bdata,
		offset: ob,
		shape: [sxb],
		stride: [txb],
	} = b;
	if (sya !== sxb) illegalShape(b.shape);
	if (out == null) {
		out = <ITensor1>tensor(b.type, [sxa], { storage: b.storage });
	}
	const {
		data: odata,
		offset: oo,
		shape: [sxo],
		stride: [txo],
	} = out;
	if (sxo !== sxa) illegalShape(out.shape);
	let oax: number, x: number, y: number, sum: number;
	for (x = 0; x < sxa; x++) {
		oax = oa + x * txa;
		sum = 0;
		for (y = 0; y < sya; y++) {
			sum += adata[oax + y * tya] * bdata[ob + y * txb];
		}
		odata[oo + x * txo] = sum;
	}
	return out;
};
