// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import type { MultiTensorOpT, TensorOpT } from "./api.js";
import type { Tensor1, Tensor2, Tensor3, Tensor4 } from "./tensor.js";
import { top } from "./top.js";

/**
 * Higher order tensor op factory. Takes given `fn` and returns a 4-tuple of
 * {@link TensorOpT}s applying the given function component-wise. The result
 * tuple uses this order: `[polymorphic, 1d, 2d, 3d, 4d]`.
 *
 * @param fn
 * @param dispatch
 */
export const defOpT = <T = number>(fn: Fn<T, T>, dispatch = 1) => {
	const f1: TensorOpT<T, T, Tensor1<T>, Tensor1<T>> = (out, a) => {
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
			odata[oo + x * txo] = fn(adata[oa + x * txa]);
		}
		return out;
	};

	const f2: TensorOpT<T, T, Tensor2<T>, Tensor2<T>> = (out, a) => {
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
		let oox: number, oax: number;
		for (let x = 0; x < sx; x++) {
			oox = oo + x * txo;
			oax = oa + x * txa;
			for (let y = 0; y < sy; y++) {
				odata[oox + y * tyo] = fn(adata[oax + y * tya]);
			}
		}
		return out;
	};

	const f3: TensorOpT<T, T, Tensor3<T>, Tensor3<T>> = (out, a) => {
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
		let oox: number, oax: number, ooy: number, oay: number;
		for (let x = 0; x < sx; x++) {
			oox = oo + x * txo;
			oax = oa + x * txa;
			for (let y = 0; y < sy; y++) {
				ooy = oox + y * tyo;
				oay = oax + y * tya;
				for (let z = 0; z < sz; z++) {
					odata[ooy + z * tzo] = fn(adata[oay + z * tza]);
				}
			}
		}
		return out;
	};

	const f4: TensorOpT<T, T, Tensor4<T>, Tensor4<T>> = (out, a) => {
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
		let oox: number,
			oax: number,
			ooy: number,
			oay: number,
			ooz: number,
			oaz: number;
		for (let x = 0; x < sx; x++) {
			oox = oo + x * txo;
			oax = oa + x * txa;
			for (let y = 0; y < sy; y++) {
				ooy = oox + y * tyo;
				oay = oax + y * tya;
				for (let z = 0; z < sz; z++) {
					ooz = ooy + z * tzo;
					oaz = oay + z * tza;
					for (let w = 0; w < sw; w++) {
						odata[ooz + w * two] = fn(adata[oaz + w * twa]);
					}
				}
			}
		}
		return out;
	};

	return <
		[
			MultiTensorOpT<T>,
			TensorOpT<T, T, Tensor1<T>, Tensor1<T>>,
			TensorOpT<T, T, Tensor2<T>, Tensor2<T>>,
			TensorOpT<T, T, Tensor3<T>, Tensor3<T>>,
			TensorOpT<T, T, Tensor4<T>, Tensor4<T>>
		]
	>[
		top<TensorOpT<T, T, any, any>>(dispatch, undefined, f1, f2, f3, f4),
		f1,
		f2,
		f3,
		f4,
	];
};
