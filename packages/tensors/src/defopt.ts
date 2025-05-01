// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import type { TensorOpT, ITensor } from "./api.js";
import { top } from "./top.js";

/**
 * Higher order tensor op factory. Takes given `fn` and returns a
 * {@link TensorOpT} applying the given function component-wise.
 *
 * @param fn
 */
export const defOpT = <T = number>(fn: Fn<T, T>) => {
	type $OP = (out: ITensor<T> | null, a: ITensor<T>) => ITensor<T>;
	const f1: $OP = (out, a) => {
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

	const f2: $OP = (out, a) => {
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

	const f3: $OP = (out, a) => {
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

	const f4: $OP = (out, a) => {
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

	return top<TensorOpT<T>>(1, undefined, <any>f1, <any>f2, <any>f3, <any>f4);
};
