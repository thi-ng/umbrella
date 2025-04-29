// SPDX-License-Identifier: Apache-2.0
import type { Fn0, Fn3 } from "@thi.ng/api";
import type { MultiTensorOpRTT, TensorOpRTT } from "./api.js";
import type { Tensor1, Tensor2, Tensor3 } from "./tensor.js";
import { top } from "./top.js";

/**
 * Higher order tensor reduction op factory. Takes given reduction `rfn` and
 * `init` function to produce an initial result. Returns a 4-tuple of
 * {@link TensorOpRTT}s applying the given function component-wise. The result
 * tuple uses this order: `[polymorphic, 1d, 2d, 3d]`.
 *
 * @param rfn
 * @param init
 */
export const defOpRTT = <A = number, B = A>(
	rfn: Fn3<B, A, A, B>,
	init: Fn0<B>
) => {
	const f1: TensorOpRTT<A, B, Tensor1<A>> = (a, b) => {
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
		let res = init();
		for (let k = 0; k < n; k++) {
			res = rfn(res, adata[ia + k * ta], bdata[ib + k * tb]);
		}
		return res;
	};

	const f2: TensorOpRTT<A, B, Tensor2<A>> = (a, b) => {
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
		let res = init();
		for (let i = 0; i < rows; i++) {
			const ia = offa + i * txa;
			const ib = offb + i * txb;
			for (let j = 0; j < cols; j++) {
				res = rfn(res, adata[ia + j * tya], bdata[ib + j * tyb]);
			}
		}
		return res;
	};

	const f3: TensorOpRTT<A, B, Tensor3<A>> = (a, b) => {
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
		let res = init();
		for (let i = 0; i < slices; i++) {
			const $offa = offa + i * txa;
			const $offb = offb + i * txb;
			for (let j = 0; j < rows; j++) {
				const ia = $offa + j * tya;
				const ib = $offb + j * tyb;
				for (let k = 0; k < cols; k++) {
					res = rfn(res, adata[ia + k * tza], bdata[ib + k * tzb]);
				}
			}
		}
		return res;
	};

	return <
		[
			MultiTensorOpRTT<A, B>,
			TensorOpRTT<A, B, Tensor1<A>>,
			TensorOpRTT<A, B, Tensor2<A>>,
			TensorOpRTT<A, B, Tensor3<A>>
		]
	>[top<TensorOpRTT<A, B, any>>(0, undefined, f1, f2, f3), f1, f2, f3];
};
