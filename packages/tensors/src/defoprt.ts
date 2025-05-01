// SPDX-License-Identifier: Apache-2.0
import type { Fn0, Fn2 } from "@thi.ng/api";
import type { MultiTensorOpRT, TensorOpRT } from "./api.js";
import type { Tensor1, Tensor2, Tensor3, Tensor4 } from "./tensor.js";
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
			data,
			offset,
			shape: [sx],
			stride: [tx],
		} = a;
		let res = init();
		for (let x = 0; x < sx; x++) {
			res = rfn(res, data[offset + x * tx]);
		}
		return res;
	};

	const f2: TensorOpRT<A, B, Tensor2<A>> = (a) => {
		const {
			data,
			offset,
			shape: [sx, sy],
			stride: [tx, ty],
		} = a;
		let res = init();
		let ox: number;
		for (let x = 0; x < sx; x++) {
			ox = offset + x * tx;
			for (let y = 0; y < sy; y++) {
				res = rfn(res, data[ox + y * ty]);
			}
		}
		return res;
	};

	const f3: TensorOpRT<A, B, Tensor3<A>> = (a) => {
		const {
			data,
			offset,
			shape: [sx, sy, sz],
			stride: [tx, ty, tz],
		} = a;
		let res = init();
		let ox: number, oy: number;
		for (let x = 0; x < sx; x++) {
			ox = offset + x * tx;
			for (let y = 0; y < sy; y++) {
				oy = ox + y * ty;
				for (let z = 0; z < sz; z++) {
					res = rfn(res, data[oy + z * tz]);
				}
			}
		}
		return res;
	};

	const f4: TensorOpRT<A, B, Tensor4<A>> = (a) => {
		const {
			data,
			offset,
			shape: [sx, sy, sz, sw],
			stride: [tx, ty, tz, tw],
		} = a;
		let res = init();
		let ox: number, oy: number, oz: number;
		for (let x = 0; x < sx; x++) {
			ox = offset + x * tx;
			for (let y = 0; y < sy; y++) {
				oy = ox + y * ty;
				for (let z = 0; z < sz; z++) {
					oz = oy + z * tz;
					for (let w = 0; w < sw; w++) {
						res = rfn(res, data[oz + w * tw]);
					}
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
			TensorOpRT<A, B, Tensor3<A>>,
			TensorOpRT<A, B, Tensor4<A>>
		]
	>[top<TensorOpRT<A, B, any>>(0, undefined, f1, f2, f3, f4), f1, f2, f3, f4];
};
