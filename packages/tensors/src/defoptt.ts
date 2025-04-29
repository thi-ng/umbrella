// SPDX-License-Identifier: Apache-2.0
import type { FnU2 } from "@thi.ng/api";
import type { MultiTensorOpTT, TensorOpTT } from "./api.js";
import { top } from "./top.js";
import type { Tensor1, Tensor2, Tensor3 } from "./tensor.js";

/**
 * Higher order tensor op factory. Takes given `fn` and returns a 4-tuple of
 * {@link TensorOpTT}s applying the given function component-wise. The result
 * tuple uses this order: `[polymorphic, 1d, 2d, 3d]`.
 *
 * @param fn
 * @param dispatch
 */
export const defOpTT = <T = number>(fn: FnU2<T>, dispatch = 1) => {
	const f1: TensorOpTT<T, T, Tensor1<T>, Tensor1<T>> = (out, a, b) => {
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

	const f2: TensorOpTT<T, T, Tensor2<T>, Tensor2<T>> = (out, a, b) => {
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

	const f3: TensorOpTT<T, T, Tensor3<T>, Tensor3<T>> = (out, a, b) => {
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

	return <
		[
			MultiTensorOpTT<T>,
			TensorOpTT<T, T, Tensor1<T>, Tensor1<T>>,
			TensorOpTT<T, T, Tensor2<T>, Tensor2<T>>,
			TensorOpTT<T, T, Tensor3<T>, Tensor3<T>>
		]
	>[
		top<TensorOpTT<T, T, any, any>>(dispatch, undefined, f1, f2, f3),
		f1,
		f2,
		f3,
	];
};
