import type { Fn0, Fn2 } from "@thi.ng/api";
import type { MultiTensorOpRT, TensorOpRT } from "./api.js";
import type { Tensor1, Tensor2, Tensor3 } from "./tensor.js";
import { top } from "./top.js";

/**
 * Higher order tensor reduction op factory. Takes given reduction `rfn` and
 * `init` function to produce an initial result. Returns a 4-tuple of
 * {@link TensorOpRT}s applying the given function component-wise. The result
 * tuple uses this order: `[polymorphic, 1d, 2d, 3d]`.
 *
 * @param rfn
 * @param init
 */
export const defOpRT = <A = number, B = A>(rfn: Fn2<B, A, B>, init: Fn0<B>) => {
	const f1: TensorOpRT<A, B, Tensor1<A>> = (a) => {
		const {
			data: adata,
			offset: ia,
			shape: [n],
			stride: [ta],
		} = a;
		let res = init();
		for (let k = 0; k < n; k++) {
			res = rfn(res, adata[ia + k * ta]);
		}
		return res;
	};

	const f2: TensorOpRT<A, B, Tensor2<A>> = (a) => {
		const {
			data: adata,
			shape: [rows, cols],
			stride: [txa, tya],
			offset: offa,
		} = a;
		let res = init();
		for (let i = 0; i < rows; i++) {
			const ia = offa + i * txa;
			for (let j = 0; j < cols; j++) {
				res = rfn(res, adata[ia + j * tya]);
			}
		}
		return res;
	};

	const f3: TensorOpRT<A, B, Tensor3<A>> = (a) => {
		const {
			data: adata,
			shape: [slices, rows, cols],
			stride: [txa, tya, tza],
			offset: offa,
		} = a;
		let res = init();
		for (let i = 0; i < slices; i++) {
			const $offa = offa + i * txa;
			for (let j = 0; j < rows; j++) {
				const ia = $offa + j * tya;
				for (let k = 0; k < cols; k++) {
					res = rfn(res, adata[ia + k * tza]);
				}
			}
		}
		return res;
	};

	return <
		[
			MultiTensorOpRT<A, B>,
			TensorOpRT<A, B, Tensor1<A>>,
			TensorOpRT<A, B, Tensor2<A>>,
			TensorOpRT<A, B, Tensor3<A>>
		]
	>[top<TensorOpRT<A, B, any>>(0, undefined, f1, f2, f3), f1, f2, f3];
};
