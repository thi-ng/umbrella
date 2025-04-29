// SPDX-License-Identifier: Apache-2.0
import { illegalShape } from "./errors.js";
import { tensor, type Tensor1, type Tensor2 } from "./tensor.js";

export const mulV = (out: Tensor1 | null, a: Tensor2, b: Tensor1) => {
	const {
		data: adata,
		offset: offa,
		shape: [rowa, cola],
		stride: [txa, tya],
	} = a;
	const {
		data: bdata,
		offset: offb,
		shape: [rowb],
		stride: [txb],
	} = b;
	if (cola !== rowb) illegalShape(b.shape);
	if (out == null) {
		out = <Tensor1>tensor(b.type, [rowa], { storage: b.storage });
	}
	const {
		data: odata,
		offset: offo,
		shape: [rowo],
		stride: [txo],
	} = out;
	if (rowo !== rowa) illegalShape(out.shape);
	for (let i = 0; i < rowa; i++) {
		const ia = offa + i * txa;
		let sum = 0;
		for (let j = 0; j < cola; j++) {
			sum += adata[ia + j * tya] * bdata[offb + j * txb];
		}
		odata[offo + i * txo] = sum;
	}
	return out;
};
