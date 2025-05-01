// SPDX-License-Identifier: Apache-2.0
import type { FnU3 } from "@thi.ng/api";
import type { TensorOpTTT, ITensor } from "./api.js";
import { broadcast } from "./broadcast.js";
import { ensureShape } from "./errors.js";
import { tensor } from "./tensor.js";

/**
 * Higher order tensor op factory. Takes given `fn` and returns a
 * {@link TensorOpTTT} applying the given function componentwise with
 * broadcasting rules (see {@link broadcast} for details).
 *
 * @param fn
 */
export const defOpTTT = <T = number>(fn: FnU3<T>): TensorOpTTT<T> => {
	type $OP = (
		out: ITensor<T>,
		a: ITensor<T>,
		b: ITensor<T>,
		c: ITensor<T>
	) => ITensor<T>;
	const f1: $OP = (out, a, b, c) => {
		const {
			data: odata,
			offset: oo,
			stride: [txo],
		} = out!;
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
		const {
			data: cdata,
			offset: oc,
			stride: [txc],
		} = c;
		for (let x = 0; x < sx; x++) {
			odata[oo + x * txo] = fn(
				adata[oa + x * txa],
				bdata[ob + x * txb],
				cdata[oc + x * txc]
			);
		}
		return out;
	};

	const f2: $OP = (out, a, b, c) => {
		const {
			data: odata,
			offset: oo,
			stride: [txo, tyo],
		} = out!;
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
		const {
			data: cdata,
			offset: oc,
			stride: [txc, tyc],
		} = c;
		let oox: number, oax: number, obx: number, ocx: number;
		for (let x = 0; x < sx; x++) {
			oox = oo + x * txo;
			oax = oa + x * txa;
			obx = ob + x * txb;
			ocx = oc + x * txc;
			for (let y = 0; y < sy; y++) {
				odata[oox + y * tyo] = fn(
					adata[oax + y * tya],
					bdata[obx + y * tyb],
					cdata[ocx + y * tyc]
				);
			}
		}
		return out;
	};

	const f3: $OP = (out, a, b, c) => {
		const {
			data: odata,
			offset: oo,
			stride: [txo, tyo, tzo],
		} = out!;
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
		const {
			data: cdata,
			offset: oc,
			stride: [txc, tyc, tzc],
		} = c;
		let oox: number,
			oax: number,
			obx: number,
			ocx: number,
			ooy: number,
			oay: number,
			oby: number,
			ocy: number;
		for (let x = 0; x < sx; x++) {
			oox = oo + x * txo;
			oax = oa + x * txa;
			obx = ob + x * txb;
			ocx = oc + x * txc;
			for (let y = 0; y < sy; y++) {
				ooy = oox + y * tyo;
				oay = oax + y * tya;
				oby = obx + y * tyb;
				ocy = ocx + y * tyc;
				for (let z = 0; z < sz; z++) {
					odata[ooy + z * tzo] = fn(
						adata[oay + z * tza],
						bdata[oby + z * tzb],
						cdata[ocy + z * tzc]
					);
				}
			}
		}
		return out;
	};

	const f4: $OP = (out, a, b, c) => {
		const {
			data: odata,
			offset: oo,
			stride: [txo, tyo, tzo, two],
		} = out!;
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
		const {
			data: cdata,
			offset: oc,
			stride: [txc, tyc, tzc, twc],
		} = c;
		let oox: number,
			oax: number,
			obx: number,
			ocx: number,
			ooy: number,
			oay: number,
			oby: number,
			ocy: number,
			ooz: number,
			oaz: number,
			obz: number,
			ocz: number;
		for (let x = 0; x < sx; x++) {
			oox = oo + x * txo;
			oax = oa + x * txa;
			obx = ob + x * txb;
			ocx = oc + x * txc;
			for (let y = 0; y < sy; y++) {
				ooy = oox + y * tyo;
				oay = oax + y * tya;
				oby = obx + y * tyb;
				ocy = ocx + y * tyc;
				for (let z = 0; z < sz; z++) {
					ooz = ooy + z * tzo;
					oaz = oay + z * tza;
					obz = oby + z * tzb;
					ocz = ocy + z * tzc;
					for (let w = 0; w < sw; w++) {
						odata[ooz + w * two] = fn(
							adata[oaz + w * twa],
							bdata[obz + w * twb],
							cdata[ocz + w * twc]
						);
					}
				}
			}
		}
		return out;
	};

	const impls = [, f1, f2, f3, f4];

	const wrapper = (
		out: ITensor<T> | null,
		a: ITensor<T>,
		b: ITensor<T>,
		c: ITensor<T>
	) => {
		const { a: $a1, b: $b } = broadcast(a, b);
		const { shape, a: $a2, b: $c } = broadcast($a1, c);
		if (out) {
			ensureShape(out, shape);
		} else {
			out = <ITensor<T>>(
				tensor(a.type, shape, { storage: <any>a.storage })
			);
		}
		return impls[shape.length]!(out, $a2, $b, $c);
	};

	return <any>wrapper;
};
