// SPDX-License-Identifier: Apache-2.0
import type { NumericArray } from "@thi.ng/api";
import { typedArrayType } from "@thi.ng/api/typedarray";
import type {
	Shape,
	ShapeTensor,
	TensorLike,
	TensorOpts,
	Type,
	TypeMap,
} from "./api.js";
import { tensor } from "./tensor.js";

/**
 * Converts/wraps given {@link TensorLike} `src` into a matching tensor
 * implementation. By default the source data is NOT copied.
 *
 * @example
 * ```ts tangle:../export/as-tensor.ts
 * import { asTensor, print } from "@thi.ng/tensors";
 *
 * const src = {
 *   data: [1, 2, 3, 4],
 *   type: <const>"num",
 *   shape: <[number,number]>[2, 2],
 *   stride: <[number,number]>[2, 1],
 * };
 *
 * print(asTensor(src));
 * //    1.0000    2.0000
 * //    3.0000    4.0000
 * ```
 *
 * @param src
 * @param opts
 */
export const asTensor = <T extends Type, S extends Shape>(
	src: TensorLike<T, S>,
	opts?: Pick<TensorOpts<TypeMap[T], S>, "storage" | "copy">
): ShapeTensor<S, TypeMap[T]> =>
	tensor(src.type, src.shape, {
		copy: false,
		data: src.data,
		stride: src.stride,
		offset: src.offset,
		...opts,
	});

/**
 * Simplified interface of thi.ng/pixel `FloatBuffer`, only defining parts
 * relevant to the conversion.
 */
export interface FloatBufferLike {
	size: [number, number];
	stride: [number, number];
	data: NumericArray;
	format: { size: number };
}

/**
 * Helper function to coerce a thi.ng/pixel float buffer (or compatible data
 * structures) into a tensor. Single-channel (i.e. grayscale) buffers will
 * result in 2D tensors, otherwise 3D (with the innermost dimension representing
 * different color channels). In all cases, this is a zero-copy operation.
 *
 * @param buffer
 */
export const fromFloatBuffer = ({
	size: [sx, sy],
	stride: [tx, ty],
	data,
	format: { size },
}: FloatBufferLike) => {
	const type = typedArrayType(data);
	return size > 1
		? tensor(type, [sy, sx, size], {
				stride: [ty, tx, 1],
				copy: false,
				data,
		  })
		: tensor(type, [sy, sx], {
				stride: [ty, tx],
				copy: false,
				data,
		  });
};
