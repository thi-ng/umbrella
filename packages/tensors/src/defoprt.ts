// SPDX-License-Identifier: Apache-2.0
import type { Fn0 } from "@thi.ng/api";
import type { TensorData, TensorOpRT } from "./api.js";
import { top } from "./top.js";

/**
 * Higher order tensor reduction op factory. Takes given reduction `rfn` and
 * `init` function to produce an initial result. Returns a {@link TensorOpRT}
 * applying the given function component-wise.
 *
 * @param rfn
 * @param init
 */
export const defOpRT = <A = number, B = A>(
	rfn: (acc: B, data: TensorData<A>, i: number) => B,
	init: Fn0<B>
) => {
	const f1: TensorOpRT<A, B> = (a) => {
		const {
			data,
			offset,
			shape: [sx],
			stride: [tx],
		} = a;
		let res = init();
		for (let x = 0; x < sx; x++) {
			res = rfn(res, data, offset + x * tx);
		}
		return res;
	};

	const f2: TensorOpRT<A, B> = (a) => {
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
				res = rfn(res, data, ox + y * ty);
			}
		}
		return res;
	};

	const f3: TensorOpRT<A, B> = (a) => {
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
					res = rfn(res, data, oy + z * tz);
				}
			}
		}
		return res;
	};

	const f4: TensorOpRT<A, B> = (a) => {
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
						res = rfn(res, data, oz + w * tw);
					}
				}
			}
		}
		return res;
	};

	return top<TensorOpRT<A, B>>(
		0,
		undefined,
		<any>f1,
		<any>f2,
		<any>f3,
		<any>f4
	);
};
