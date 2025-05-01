// SPDX-License-Identifier: Apache-2.0
import type { Fn0, Fn3 } from "@thi.ng/api";
import type { ITensor, TensorOpRTT } from "./api.js";
import { broadcast } from "./broadcast.js";

/**
 * Higher order tensor reduction op factory. Takes given reduction `rfn` and
 * `init` function to produce an initial result. Returns a {@link TensorOpRTT}
 * applying the given function componentwise with broadcasting rules (see
 * {@link broadcast} for details).
 *
 * @param rfn
 * @param init
 */
export const defOpRTT = <A = number, B = A>(
	rfn: Fn3<B, A, A, B>,
	init: Fn0<B>
): TensorOpRTT<A, B> => {
	const f1: TensorOpRTT<A, B> = (a, b) => {
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
		let res = init();
		for (let x = 0; x < sx; x++) {
			res = rfn(res, adata[oa + x * txa], bdata[ob + x * txb]);
		}
		return res;
	};

	const f2: TensorOpRTT<A, B> = (a, b) => {
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
		let res = init();
		let oax: number, obx: number;
		for (let x = 0; x < sx; x++) {
			oax = oa + x * txa;
			obx = ob + x * txb;
			for (let y = 0; y < sy; y++) {
				res = rfn(res, adata[oax + y * tya], bdata[obx + y * tyb]);
			}
		}
		return res;
	};

	const f3: TensorOpRTT<A, B> = (a, b) => {
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
		let res = init();
		let oax: number, obx: number, oay: number, oby: number;
		for (let x = 0; x < sx; x++) {
			oax = oa + x * txa;
			obx = ob + x * txb;
			for (let y = 0; y < sy; y++) {
				oay = oax + y * tya;
				oby = obx + y * tyb;
				for (let z = 0; z < sz; z++) {
					res = rfn(res, adata[oay + z * tza], bdata[oby + z * tzb]);
				}
			}
		}
		return res;
	};

	const f4: TensorOpRTT<A, B> = (a, b) => {
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
		let res = init();
		let oax: number,
			obx: number,
			oay: number,
			oby: number,
			oaz: number,
			obz: number;
		for (let x = 0; x < sx; x++) {
			oax = oa + x * txa;
			obx = ob + x * txb;
			for (let y = 0; y < sy; y++) {
				oay = oax + y * tya;
				oby = obx + y * tyb;
				for (let z = 0; z < sz; z++) {
					oaz = oay + z * tza;
					obz = oby + z * tzb;
					for (let w = 0; w < sw; w++) {
						res = rfn(
							res,
							adata[oaz + w * twa],
							bdata[obz + w * twb]
						);
					}
				}
			}
		}
		return res;
	};

	const impls = [, f1, f2, f3, f4];

	const wrapper = (a: ITensor<A>, b: ITensor<A>) => {
		const { shape, a: $a, b: $b } = broadcast(a, b);
		return impls[shape.length]!($a, $b);
	};

	return <any>wrapper;
};
