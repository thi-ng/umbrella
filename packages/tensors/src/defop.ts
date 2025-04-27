import { assert } from "@thi.ng/errors/assert";
import type { VecOpSGV, VecOpSGVN, VecOpSGVV } from "@thi.ng/vectors";
import { dotS } from "@thi.ng/vectors/dots";
import { tensor, type Tensor1, type Tensor2, type Tensor3 } from "./tensor.js";

export const defOpV1 = (fn: VecOpSGV) => (out: Tensor1, a: Tensor1) => {
	!out && (out = a);
	return fn(
		out.data,
		a.data,
		a.length,
		out.offset,
		a.offset,
		out.stride[0],
		a.stride[0]
	);
};

export const defOpV2 = (fn: VecOpSGV) => (out: Tensor2, a: Tensor2) => {
	!out && (out = a);
	const {
		data: odata,
		stride: [txo, tyo],
		offset: offo,
	} = out;
	const {
		data: adata,
		shape: [rows, cols],
		stride: [txa, tya],
		offset: offa,
	} = a;
	for (let i = 0; i < rows; i++) {
		fn(odata, adata, cols, offo + txo * i, offa + txa * i, tyo, tya);
	}
	return out;
};

export const defOpVV1 =
	(fn: VecOpSGVV) => (out: Tensor1, a: Tensor1, b: Tensor1) => {
		!out && (out = a);
		return fn(
			out.data,
			a.data,
			b.data,
			a.length,
			out.offset,
			a.offset,
			b.offset,
			out.stride[0],
			a.stride[0],
			b.stride[0]
		);
	};

export const defOpVV2 =
	(fn: VecOpSGVV) => (out: Tensor2, a: Tensor2, b: Tensor2) => {
		!out && (out = a);
		const {
			data: odata,
			stride: [txo, tyo],
			offset: offo,
		} = out;
		const {
			data: adata,
			shape: [rows, cols],
			stride: [txa, tya],
			offset: offa,
		} = a;
		const {
			data: bdata,
			stride: [txb, tyb],
			offset: offb,
		} = b;
		for (let i = 0; i < rows; i++) {
			fn(
				odata,
				adata,
				bdata,
				cols,
				offo + txo * i,
				offa + txa * i,
				offb + txb * i,
				tyo,
				tya,
				tyb
			);
		}
		return out;
	};

export const defOpVV3 =
	(fn: VecOpSGVV) => (out: Tensor3, a: Tensor3, b: Tensor3) => {
		!out && (out = a);
		const {
			data: odata,
			stride: [txo, tyo, tzo],
			offset: offo,
		} = out;
		const {
			data: adata,
			shape: [slices, rows, cols],
			stride: [txa, tya, tza],
			offset: offa,
		} = a;
		const {
			data: bdata,
			stride: [txb, tyb, tzb],
			offset: offb,
		} = b;
		for (let j = 0; j < slices; j++) {
			const $offo = offo + j * txo;
			const $offa = offa + j * txa;
			const $offb = offb + j * txb;
			for (let i = 0; i < rows; i++) {
				fn(
					odata,
					adata,
					bdata,
					cols,
					$offo + tyo * i,
					$offa + tya * i,
					$offb + tyb * i,
					tzo,
					tza,
					tzb
				);
			}
		}
		return out;
	};

export const defOpVN1 =
	(fn: VecOpSGVN) => (out: Tensor1, a: Tensor1, n: number) => {
		!out && (out = a);
		return fn(
			out.data,
			a.data,
			n,
			a.length,
			out.offset,
			a.offset,
			out.stride[0],
			a.stride[0]
		);
	};

export const defOpVN2 =
	(fn: VecOpSGVN) => (out: Tensor2, a: Tensor2, n: number) => {
		!out && (out = a);
		const {
			data: odata,
			stride: [txo, tyo],
			offset: offo,
		} = out;
		const {
			data: adata,
			shape: [rows, cols],
			stride: [txa, tya],
			offset: offa,
		} = a;
		for (let i = 0; i < rows; i++) {
			fn(odata, adata, n, cols, offo + txo * i, offa + txa * i, tyo, tya);
		}
		return out;
	};

export const defOpVN3 =
	(fn: VecOpSGVN) => (out: Tensor3, a: Tensor3, n: number) => {
		!out && (out = a);
		const {
			data: odata,
			stride: [txo, tyo, tzo],
			offset: offo,
		} = out;
		const {
			data: adata,
			shape: [slices, rows, cols],
			stride: [txa, tya, tza],
			offset: offa,
		} = a;
		for (let j = 0; j < slices; j++) {
			const $offo = offo + j * txo;
			const $offa = offa + j * txa;
			for (let i = 0; i < rows; i++) {
				fn(
					odata,
					adata,
					n,
					cols,
					$offo + tyo * i,
					$offa + tya * i,
					tzo,
					tza
				);
			}
		}
		return out;
	};

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
			odata[io + j * tyo] = dotS(adata, bdata, cola, ia, ib, tya, txb);
		}
	}
	return out;
};
