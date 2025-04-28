import type { FnU3 } from "@thi.ng/api";
import type { MultiTensorOpTNN, TensorOpTNN } from "./api.js";
import type { Tensor1, Tensor2, Tensor3 } from "./tensor.js";
import { top } from "./top.js";

/**
 * Higher order tensor op factory. Takes given `fn` and returns a 4-tuple of
 * {@link TensorOpTNN}s applying the given function component-wise. The result
 * tuple uses this order: `[polymorphic, 1d, 2d, 3d]`.
 *
 * @param fn
 * @param dispatch
 */
export const defOpTNN = <T = number>(fn: FnU3<T>, dispatch = 1) => {
	const f1: TensorOpTNN<T, T, Tensor1<T>, Tensor1<T>> = (out, a, n, m) => {
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
			odata[io + k * to] = fn(adata[ia + k * ta], n, m);
		}
		return out;
	};

	const f2: TensorOpTNN<T, T, Tensor2<T>, Tensor2<T>> = (out, a, n, m) => {
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
				odata[io + j * tyo] = fn(adata[ia + j * tya], n, m);
			}
		}
		return out;
	};

	const f3: TensorOpTNN<T, T, Tensor3<T>, Tensor3<T>> = (out, a, n, m) => {
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
					odata[io + k * tzo] = fn(adata[ia + k * tza], n, m);
				}
			}
		}
		return out;
	};

	return <
		[
			MultiTensorOpTNN<T>,
			TensorOpTNN<T, T, Tensor1<T>, Tensor1<T>>,
			TensorOpTNN<T, T, Tensor2<T>, Tensor2<T>>,
			TensorOpTNN<T, T, Tensor3<T>, Tensor3<T>>
		]
	>[
		top<TensorOpTNN<T, T, any, any>>(dispatch, undefined, f1, f2, f3),
		f1,
		f2,
		f3,
	];
};
