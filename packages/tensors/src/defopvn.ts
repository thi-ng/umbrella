import type { FnN2 } from "@thi.ng/api";
import type { Tensor1, Tensor2, Tensor3 } from "./tensor.js";

export const defOpVN1 = (fn: FnN2) => (out: Tensor1, a: Tensor1, n: number) => {
	!out && (out = a);
	const {
		data: odata,
		offset: io,
		stride: [to],
	} = out;
	const {
		data: adata,
		offset: ia,
		shape: [l],
		stride: [ta],
	} = a;
	for (let k = 0; k < l; k++) {
		odata[io + k * to] = fn(adata[ia + k * ta], n);
	}
	return out;
};

export const defOpVN2 = (fn: FnN2) => (out: Tensor2, a: Tensor2, n: number) => {
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
		const io = offo + i * txo;
		const ia = offa + i * txa;
		for (let j = 0; j < cols; j++) {
			odata[io + j * tyo] = fn(adata[ia + j * tya], n);
		}
	}
	return out;
};

export const defOpVN3 = (fn: FnN2) => (out: Tensor3, a: Tensor3, n: number) => {
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
	for (let i = 0; i < slices; i++) {
		const $offo = offo + i * txo;
		const $offa = offa + i * txa;
		for (let j = 0; j < rows; j++) {
			const io = $offo + j * tyo;
			const ia = $offa + j * tya;
			for (let k = 0; k < cols; k++) {
				odata[io + k * tzo] = fn(adata[ia + k * tza], n);
			}
		}
	}
	return out;
};
