// SPDX-License-Identifier: Apache-2.0
import { dotS } from "@thi.ng/vectors/dots";
import type { TensorOpRTT } from "./api.js";
import { defOpRTT } from "./defoprtt.js";
import type { Tensor1 } from "./tensor.js";

const [a, _, c, d, e] = defOpRTT(
	(acc, x, y) => acc + x * y,
	() => 0
);

/**
 * Dot product of given nD tensors. Multi-method.
 *
 * @param a - input tensor
 * @param b - input tensor
 */
export const dot = a;

/**
 * Dot product of given 1D tensors.
 *
 * @param a - input tensor
 * @param b - input tensor
 */
export const dot1: TensorOpRTT<number, number, Tensor1> = (a, b) =>
	dotS(
		a.data,
		b.data,
		a.length,
		a.offset,
		b.offset,
		a.stride[0],
		b.stride[0]
	);

/**
 * Dot product of given 2D tensors. Use {@link mulM} for matrix multiplication.
 *
 * @param a - input tensor
 * @param b - input tensor
 */
export const dot2 = c;

/**
 * Dot product of given 3D tensors.
 *
 * @param a - input tensor
 * @param b - input tensor
 */
export const dot3 = d;

/**
 * Dot product of given 4D tensors.
 *
 * @param a - input tensor
 * @param b - input tensor
 */
export const dot4 = e;
