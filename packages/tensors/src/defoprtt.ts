// SPDX-License-Identifier: Apache-2.0
import { identity } from "@thi.ng/api/fn";
import type { ITensor, TensorData, TensorOpRTT } from "./api.js";
import { broadcast } from "./broadcast.js";

/**
 * Higher order tensor reduction op factory. Takes given reduction `rfn` and
 * `init` function to produce an initial result and optional `complete` to
 * produce the final result. Returns a {@link TensorOpRTT} applying the given
 * function componentwise, by default with broadcasting rules (see
 * {@link broadcast} for details).
 *
 * @param rfn
 * @param init
 * @param complete
 * @param useBroadcast
 */
export const defOpRTT = <A = number, B = A>(
	rfn: (
		acc: B,
		adata: TensorData<A>,
		bdata: TensorData<A>,
		ia: number,
		ib: number
	) => B,
	init: () => B,
	complete: (acc: B, a: ITensor<A>, b: ITensor<A>) => B = identity,
	useBroadcast = true
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
			res = rfn(res, adata, bdata, oa + x * txa, ob + x * txb);
		}
		return complete(res, a, b);
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
				res = rfn(res, adata, bdata, oax + y * tya, obx + y * tyb);
			}
		}
		return complete(res, a, b);
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
					res = rfn(res, adata, bdata, oay + z * tza, oby + z * tzb);
				}
			}
		}
		return complete(res, a, b);
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
							adata,
							bdata,
							oaz + w * twa,
							obz + w * twb
						);
					}
				}
			}
		}
		return complete(res, a, b);
	};

	const impls = [, f1, f2, f3, f4];

	const wrapper = useBroadcast
		? (a: ITensor<A>, b: ITensor<A>) => {
				const { shape, a: $a, b: $b } = broadcast(a, b);
				return impls[shape.length]!($a, $b);
		  }
		: (a: ITensor<A>, b: ITensor<A>) => impls[a.dim]!(a, b);

	return <any>wrapper;
};
