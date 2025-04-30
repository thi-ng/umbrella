// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import type { MultiTensorOpN, TensorOpN } from "./api.js";
import type { Tensor1, Tensor2, Tensor3, Tensor4 } from "./tensor.js";
import { top } from "./top.js";

/**
 * Higher order tensor op factory. Takes given `fn` and returns a 4-tuple of
 * {@link TensorOpN}s applying the given function component-wise. The result
 * tuple uses this order: `[polymorphic, 1d, 2d, 3d, 4d]`.
 *
 * @param fn
 * @param dispatch
 */
export const defOpN = <A = number, B = A>(fn: Fn<A, B>) => {
	const f1: TensorOpN<A, B, Tensor1<B>> = (out, a) => {
		const {
			data,
			offset,
			shape: [sx],
			stride: [tx],
		} = out;
		for (let x = 0; x < sx; x++) data[offset + x * tx] = fn(a);
		return out;
	};

	const f2: TensorOpN<A, B, Tensor2<B>> = (out, a) => {
		const {
			data,
			shape: [sx, sy],
			stride: [tx, ty],
			offset,
		} = out;
		for (let x = 0; x < sx; x++) {
			const ox = offset + x * tx;
			for (let y = 0; y < sy; y++) data[ox + y * ty] = fn(a);
		}
		return out;
	};

	const f3: TensorOpN<A, B, Tensor3<B>> = (out, a) => {
		const {
			data,
			shape: [sx, sy, sz],
			stride: [tx, ty, tz],
			offset,
		} = out;
		for (let x = 0; x < sx; x++) {
			const ox = offset + x * tx;
			for (let y = 0; y < sy; y++) {
				const oy = ox + y * ty;
				for (let z = 0; z < sz; z++) data[oy + z * tz] = fn(a);
			}
		}
		return out;
	};

	const f4: TensorOpN<A, B, Tensor4<B>> = (out, a) => {
		const {
			data,
			shape: [sx, sy, sz, sw],
			stride: [tx, ty, tz, tw],
			offset,
		} = out;
		for (let x = 0; x < sx; x++) {
			const ox = offset + x * tx;
			for (let y = 0; y < sy; y++) {
				const oy = ox + y * ty;
				for (let z = 0; z < sz; z++) {
					const oz = oy + z * tz;
					for (let w = 0; w < sw; w++) data[oz + w * tw] = fn(a);
				}
			}
		}
		return out;
	};

	return <
		[
			MultiTensorOpN<A, B>,
			TensorOpN<A, B, Tensor1<B>>,
			TensorOpN<A, B, Tensor2<B>>,
			TensorOpN<A, B, Tensor3<B>>,
			TensorOpN<A, B, Tensor4<B>>
		]
	>[top<TensorOpN<A, B, any>>(0, undefined, f1, f2, f3, f4), f1, f2, f3, f4];
};
