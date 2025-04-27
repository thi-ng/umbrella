import type { FnN2 } from "@thi.ng/api";
import type { Tensor1, Tensor2, Tensor3 } from "./tensor.js";

export const defOpVV1 =
	(fn: FnN2) => (out: Tensor1, a: Tensor1, b: Tensor1) => {
		!out && (out = a);
		const {
			data: odata,
			offset: io,
			stride: [to],
		} = out;
		const {
			data: adata,
			offset: ia,
			shape: [n],
			stride: [ta],
		} = a;
		const {
			data: bdata,
			offset: ib,
			stride: [tb],
		} = b;
		for (let k = 0; k < n; k++) {
			odata[io + k * to] = fn(adata[ia + k * ta], bdata[ib + k * tb]);
		}
		return out;
	};

export const defOpVV2 =
	(fn: FnN2) => (out: Tensor2, a: Tensor2, b: Tensor2) => {
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
			const io = offo + i * txo;
			const ia = offa + i * txa;
			const ib = offb + i * txb;
			for (let j = 0; j < cols; j++) {
				odata[io + j * tyo] = fn(
					adata[ia + j * tya],
					bdata[ib + j * tyb]
				);
			}
		}
		return out;
	};

export const defOpVV3 =
	(fn: FnN2) => (out: Tensor3, a: Tensor3, b: Tensor3) => {
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
		for (let i = 0; i < slices; i++) {
			const $offo = offo + i * txo;
			const $offa = offa + i * txa;
			const $offb = offb + i * txb;
			for (let j = 0; j < rows; j++) {
				const io = $offo + j * tyo;
				const ia = $offa + j * tya;
				const ib = $offb + j * tyb;
				for (let k = 0; k < cols; k++) {
					odata[io + k * tzo] = fn(
						adata[ia + k * tza],
						bdata[ib + k * tzb]
					);
				}
			}
		}
		return out;
	};
