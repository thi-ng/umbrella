// SPDX-License-Identifier: Apache-2.0
import { assert } from "@thi.ng/errors/assert";
import { tensor, type Tensor2 } from "./tensor.js";

/**
 * Matrix-matrix multiplication between matrix `a` (MxN) and matrix `b` (PxQ).
 * If `out` is given, it MUST be a MxQ tensor. If null then a new one will be
 * created, using `a`'s storage impl.
 *
 * @param out
 * @param a
 * @param b
 */
export const mulM = (out: Tensor2 | null, a: Tensor2, b: Tensor2) => {
	const {
		data: adata,
		offset: oa,
		shape: [sxa, sya],
		stride: [txa, tya],
	} = a;
	const {
		data: bdata,
		offset: ob,
		shape: [sxb, syb],
		stride: [txb, tyb],
	} = b;
	assert(
		sya === sxb,
		`incompatible matrix shapes, matrix b requires ${sya} rows`
	);
	if (out == null) {
		out = <Tensor2>tensor(a.type, [sxa, syb], { storage: a.storage });
	}
	const {
		data: odata,
		offset: oo,
		shape: [sxo, syo],
		stride: [txo, tyo],
	} = out;
	assert(
		sxo === sxa && syo === syb,
		`incompatible output matrix shape, expected: [${sxa},${syb}]`
	);
	let oax: number,
		oox: number,
		oby: number,
		i: number,
		j: number,
		k: number,
		sum: number;
	for (i = 0; i < sxa; i++) {
		oox = oo + i * txo;
		oax = oa + i * txa;
		for (j = 0; j < syb; j++) {
			oby = ob + j * tyb;
			sum = 0;
			for (k = 0; k < sya; k++) {
				sum += adata[oax + k * tya] * bdata[oby + k * txb];
			}
			odata[oox + j * tyo] = sum;
		}
	}
	return out;
};
