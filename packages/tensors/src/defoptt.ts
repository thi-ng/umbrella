// SPDX-License-Identifier: Apache-2.0
import type { FnU2 } from "@thi.ng/api";
import type { ITensor, TensorOpTT } from "./api.js";
import { broadcast } from "./broadcast.js";
import { ensureShape } from "./errors.js";
import { tensor } from "./tensor.js";

/**
 * Higher order tensor op factory. Takes given `fn` and returns a
 * {@link TensorOpTT} applying the given function componentwise with
 * broadcasting rules (see {@link broadcast} for details).
 *
 * @param fn
 * @param dispatch
 */
export const defOpTT = <T = number>(fn: FnU2<T>): TensorOpTT<T> => {
	type $OP = (out: ITensor<T>, a: ITensor<T>, b: ITensor<T>) => ITensor<T>;
	const f0: $OP = (out, a, b) => {
		!out && (out = a);
		out.data[out.offset] = fn(a.data[a.offset], b.data[b.offset]);
		return out;
	};

	const f1: $OP = (out, a, b) => {
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
		const {
			data: bdata,
			offset: ob,
			stride: [txb],
		} = b;
		for (let x = 0; x < sx; x++) {
			odata[oo + x * txo] = fn(adata[oa + x * txa], bdata[ob + x * txb]);
		}
		return out;
	};

	const f2: $OP = (out, a, b) => {
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
		const {
			data: bdata,
			offset: ob,
			stride: [txb, tyb],
		} = b;
		let oox: number, oax: number, obx: number;
		for (let x = 0; x < sx; x++) {
			oox = oo + x * txo;
			oax = oa + x * txa;
			obx = ob + x * txb;
			for (let y = 0; y < sy; y++) {
				odata[oox + y * tyo] = fn(
					adata[oax + y * tya],
					bdata[obx + y * tyb]
				);
			}
		}
		return out;
	};

	const f3: $OP = (out, a, b) => {
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
		const {
			data: bdata,
			offset: ob,
			stride: [txb, tyb, tzb],
		} = b;
		let oox: number,
			oax: number,
			obx: number,
			ooy: number,
			oay: number,
			oby: number;
		for (let x = 0; x < sx; x++) {
			oox = oo + x * txo;
			oax = oa + x * txa;
			obx = ob + x * txb;
			for (let y = 0; y < sy; y++) {
				ooy = oox + y * tyo;
				oay = oax + y * tya;
				oby = obx + y * tyb;
				for (let z = 0; z < sz; z++) {
					odata[ooy + z * tzo] = fn(
						adata[oay + z * tza],
						bdata[oby + z * tzb]
					);
				}
			}
		}
		return out;
	};

	const f4: $OP = (out, a, b) => {
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
		const {
			data: bdata,
			offset: ob,
			stride: [txb, tyb, tzb, twb],
		} = b;
		let oox: number,
			oax: number,
			obx: number,
			ooy: number,
			oay: number,
			oby: number,
			ooz: number,
			oaz: number,
			obz: number;
		for (let x = 0; x < sx; x++) {
			oox = oo + x * txo;
			oax = oa + x * txa;
			obx = ob + x * txb;
			for (let y = 0; y < sy; y++) {
				ooy = oox + y * tyo;
				oay = oax + y * tya;
				oby = obx + y * tyb;
				for (let z = 0; z < sz; z++) {
					ooz = ooy + z * tzo;
					oaz = oay + z * tza;
					obz = oby + z * tzb;
					for (let w = 0; w < sw; w++) {
						odata[ooz + w * two] = fn(
							adata[oaz + w * twa],
							bdata[obz + w * twb]
						);
					}
				}
			}
		}
		return out;
	};

	const impls = [f0, f1, f2, f3, f4];

	const wrapper = (out: ITensor<T> | null, a: ITensor<T>, b: ITensor<T>) => {
		const { shape, a: $a, b: $b } = broadcast(a, b);
		if (out) {
			ensureShape(out, shape);
		} else {
			out = tensor<any, any>(a.type, shape, { storage: <any>a.storage });
		}
		return impls[shape.length]!(out, $a, $b);
	};

	return <any>wrapper;
};
