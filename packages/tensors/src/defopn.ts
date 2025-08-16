// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import type { TensorOpN, ITensor } from "./api.js";
import { top } from "./top.js";

/**
 * Higher order tensor op factory. Takes given `fn` and returns a
 * {@link TensorOpN} applying the given function component-wise.
 *
 * @param fn
 */
export const defOpN = <A = number, B = A>(fn: Fn<A, B>) => {
	type $OP = (out: ITensor<B>, n: A) => ITensor<B>;

	const f0: $OP = (out, a) => {
		out.data[out.offset] = fn(a);
		return out;
	};

	const f1: $OP = (out, a) => {
		const {
			data,
			offset,
			shape: [sx],
			stride: [tx],
		} = out;
		for (let x = 0; x < sx; x++) data[offset + x * tx] = fn(a);
		return out;
	};

	const f2: $OP = (out, a) => {
		const {
			data,
			shape: [sx, sy],
			stride: [tx, ty],
			offset,
		} = out;
		let ox: number;
		for (let x = 0; x < sx; x++) {
			ox = offset + x * tx;
			for (let y = 0; y < sy; y++) data[ox + y * ty] = fn(a);
		}
		return out;
	};

	const f3: $OP = (out, a) => {
		const {
			data,
			shape: [sx, sy, sz],
			stride: [tx, ty, tz],
			offset,
		} = out;
		let ox: number, oy: number;
		for (let x = 0; x < sx; x++) {
			ox = offset + x * tx;
			for (let y = 0; y < sy; y++) {
				oy = ox + y * ty;
				for (let z = 0; z < sz; z++) data[oy + z * tz] = fn(a);
			}
		}
		return out;
	};

	const f4: $OP = (out, a) => {
		const {
			data,
			shape: [sx, sy, sz, sw],
			stride: [tx, ty, tz, tw],
			offset,
		} = out;
		let ox: number, oy: number, oz: number;
		for (let x = 0; x < sx; x++) {
			ox = offset + x * tx;
			for (let y = 0; y < sy; y++) {
				oy = ox + y * ty;
				for (let z = 0; z < sz; z++) {
					oz = oy + z * tz;
					for (let w = 0; w < sw; w++) data[oz + w * tw] = fn(a);
				}
			}
		}
		return out;
	};

	return top<TensorOpN<A, B>>(0, <any>f0, <any>f1, <any>f2, <any>f3, <any>f4);
};
