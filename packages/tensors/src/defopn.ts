import type { Fn } from "@thi.ng/api";
import type { MultiTensorOpN, TensorOpN } from "./api.js";
import type { Tensor1, Tensor2, Tensor3 } from "./tensor.js";
import { top } from "./top.js";

/**
 * Higher order tensor op factory. Takes given `fn` and returns a 4-tuple of
 * {@link TensorOpN}s applying the given function component-wise. The result
 * tuple uses this order: `[polymorphic, 1d, 2d, 3d]`.
 *
 * @param fn
 * @param dispatch
 */
export const defOpN = <A = number, B = A>(fn: Fn<A, B>) => {
	const f1: TensorOpN<A, B, Tensor1<B>> = (out, a) => {
		const {
			data: odata,
			offset: io,
			shape: [so],
			stride: [to],
		} = out;
		for (let k = 0; k < so; k++) odata[io + k * to] = fn(a);
		return out;
	};

	const f2: TensorOpN<A, B, Tensor2<B>> = (out, a) => {
		const {
			data: odata,
			shape: [rows, cols],
			stride: [txo, tyo],
			offset: offo,
		} = out;
		for (let i = 0; i < rows; i++) {
			const io = offo + i * txo;
			for (let j = 0; j < cols; j++) odata[io + j * tyo] = fn(a);
		}
		return out;
	};

	const f3: TensorOpN<A, B, Tensor3<B>> = (out, a) => {
		const {
			data: odata,
			shape: [slices, rows, cols],
			stride: [txo, tyo, tzo],
			offset: offo,
		} = out;
		for (let i = 0; i < slices; i++) {
			const $offo = offo + i * txo;
			for (let j = 0; j < rows; j++) {
				const io = $offo + j * tyo;
				for (let k = 0; k < cols; k++) odata[io + k * tzo] = fn(a);
			}
		}
		return out;
	};

	return <
		[
			MultiTensorOpN<A, B>,
			TensorOpN<A, B, Tensor1<B>>,
			TensorOpN<A, B, Tensor2<B>>,
			TensorOpN<A, B, Tensor3<B>>
		]
	>[top<TensorOpN<A, B, any>>(0, undefined, f1, f2, f3), f1, f2, f3];
};
