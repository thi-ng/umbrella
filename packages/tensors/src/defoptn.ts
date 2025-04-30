// SPDX-License-Identifier: Apache-2.0
import type { FnU2 } from "@thi.ng/api";
import type { MultiTensorOpTN, TensorOpTN } from "./api.js";
import type { Tensor1, Tensor2, Tensor3, Tensor4 } from "./tensor.js";
import { top } from "./top.js";

/**
 * Higher order tensor op factory. Takes given `fn` and returns a 4-tuple of
 * {@link TensorOpTN}s applying the given function component-wise. The result
 * tuple uses this order: `[polymorphic, 1d, 2d, 3d, 4d]`.
 *
 * @param fn
 * @param dispatch
 */
export const defOpTN = <T = number>(fn: FnU2<T>, dispatch = 1) => {
	const f1: TensorOpTN<T, T, Tensor1<T>, Tensor1<T>> = (out, a, n) => {
		!out && (out = a);
		const {
			data: odata,
			offset: oo,
			stride: [txo],
		} = out;
		const {
			data: adata,
			offset: oa,
			shape: [sx],
			stride: [txa],
		} = a;
		for (let x = 0; x < sx; x++) {
			odata[oo + x * txo] = fn(adata[oa + x * txa], n);
		}
		return out;
	};

	const f2: TensorOpTN<T, T, Tensor2<T>, Tensor2<T>> = (out, a, n) => {
		!out && (out = a);
		const {
			data: odata,
			offset: oo,
			stride: [txo, tyo],
		} = out;
		const {
			data: adata,
			offset: oa,
			shape: [sx, sy],
			stride: [txa, tya],
		} = a;
		for (let x = 0; x < sx; x++) {
			const oox = oo + x * txo;
			const oax = oa + x * txa;
			for (let y = 0; y < sy; y++) {
				odata[oox + y * tyo] = fn(adata[oax + y * tya], n);
			}
		}
		return out;
	};

	const f3: TensorOpTN<T, T, Tensor3<T>, Tensor3<T>> = (out, a, n) => {
		!out && (out = a);
		const {
			data: odata,
			offset: oo,
			stride: [txo, tyo, tzo],
		} = out;
		const {
			data: adata,
			offset: oa,
			shape: [sx, sy, sz],
			stride: [txa, tya, tza],
		} = a;
		for (let x = 0; x < sx; x++) {
			const oox = oo + x * txo;
			const oax = oa + x * txa;
			for (let y = 0; y < sy; y++) {
				const ooy = oox + y * tyo;
				const oay = oax + y * tya;
				for (let z = 0; z < sz; z++) {
					odata[ooy + z * tzo] = fn(adata[oay + z * tza], n);
				}
			}
		}
		return out;
	};

	const f4: TensorOpTN<T, T, Tensor4<T>, Tensor4<T>> = (out, a, n) => {
		!out && (out = a);
		const {
			data: odata,
			offset: oo,
			stride: [txo, tyo, tzo, two],
		} = out;
		const {
			data: adata,
			offset: oa,
			shape: [sx, sy, sz, sw],
			stride: [txa, tya, tza, twa],
		} = a;
		for (let x = 0; x < sx; x++) {
			const oox = oo + x * txo;
			const oax = oa + x * txa;
			for (let y = 0; y < sy; y++) {
				const ooy = oox + y * tyo;
				const oay = oax + y * tya;
				for (let z = 0; z < sz; z++) {
					const ooz = ooy + z * tzo;
					const oaz = oay + z * tza;
					for (let w = 0; w < sw; w++) {
						odata[ooz + w * two] = fn(adata[oaz + w * twa], n);
					}
				}
			}
		}
		return out;
	};

	return <
		[
			MultiTensorOpTN<T>,
			TensorOpTN<T, T, Tensor1<T>, Tensor1<T>>,
			TensorOpTN<T, T, Tensor2<T>, Tensor2<T>>,
			TensorOpTN<T, T, Tensor3<T>, Tensor3<T>>,
			TensorOpTN<T, T, Tensor4<T>, Tensor4<T>>
		]
	>[
		top<TensorOpTN<T, T, any, any>>(dispatch, undefined, f1, f2, f3, f4),
		f1,
		f2,
		f3,
		f4,
	];
};
