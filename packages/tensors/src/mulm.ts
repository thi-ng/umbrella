import { assert } from "@thi.ng/errors/assert";
import { tensor, type Tensor2 } from "./tensor.js";

export const mulM = (out: Tensor2 | null, a: Tensor2, b: Tensor2) => {
	const {
		data: adata,
		offset: offa,
		shape: [rowa, cola],
		stride: [txa, tya],
	} = a;
	const {
		data: bdata,
		offset: offb,
		shape: [rowb, colb],
		stride: [txb, tyb],
	} = b;
	assert(
		cola === rowb,
		`incompatible matrix shapes, matrix b requires ${cola} rows`
	);
	if (out == null) {
		out = <Tensor2>tensor(a.type, [rowa, colb], { storage: a.storage });
	}
	const {
		data: odata,
		offset: offo,
		shape: [rowo, colo],
		stride: [txo, tyo],
	} = out;
	assert(
		rowo === rowa && colo === colb,
		`incompatible output matrix shape, expected: [${rowa},${colb}]`
	);
	for (let i = 0; i < rowa; i++) {
		const io = offo + i * txo;
		const ia = offa + i * txa;
		for (let j = 0; j < colb; j++) {
			const ib = offb + j * tyb;
			let dot = 0;
			for (let j = 0; j < cola; j++) {
				dot += adata[ia + j * tya] * bdata[ib + j * txb];
			}
			odata[io + j * tyo] = dot;
		}
	}
	return out;
};
