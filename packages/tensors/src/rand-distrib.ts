// SPDX-License-Identifier: Apache-2.0
import type { Fn0 } from "@thi.ng/api";
import { normal as op } from "@thi.ng/random/distributions/normal";
import type { ITensor } from "./api.js";
import type { Tensor1, Tensor2, Tensor3 } from "./tensor.js";
import { top } from "./top.js";

/**
 * Same as {@link randDistrib}, optimized for 1D tensors.
 *
 * @param a
 * @param rnd
 * @param n
 */
export const randDistrib1 = (a: Tensor1, rnd = op(), n = 1) => {
	const {
		data,
		offset,
		shape: [l],
		stride: [s],
	} = a;
	for (let i = 0; i < l; i++) data[offset + i * s] = rnd() * n;
	return a;
};

/**
 * Same as {@link randDistrib}, optimized for 2D tensors.
 *
 * @param a
 * @param rnd
 * @param n
 */
export const randDistrib2 = (a: Tensor2, rnd = op(), n = 1) => {
	const {
		data: adata,
		shape: [rows, cols],
		stride: [txa, tya],
		offset: offa,
	} = a;
	for (let i = 0; i < rows; i++) {
		const ia = offa + i * txa;
		for (let j = 0; j < cols; j++) {
			adata[ia + j * tya] = rnd() * n;
		}
	}
	return a;
};

/**
 * Same as {@link randDistrib}, optimized for 3D tensors.
 *
 * @param a
 * @param rnd
 * @param n
 */
export const randDistrib3 = (a: Tensor3, rnd = op(), n = 1) => {
	const {
		data: adata,
		shape: [slices, rows, cols],
		stride: [txa, tya, tza],
		offset: offa,
	} = a;
	for (let i = 0; i < slices; i++) {
		const $offa = offa + i * txa;
		for (let j = 0; j < rows; j++) {
			const ia = $offa + j * tya;
			for (let k = 0; k < cols; k++) {
				adata[ia + k * tza] = rnd() * n;
			}
		}
	}
	return a;
};

/**
 * Randomizes given nD tensor `a`, with each component drawn from given random
 * distribution function (default: gaussian/normal distribution) and scaled to
 * `n` (default: 1).
 *
 * @remarks
 * References:
 *
 * - https://docs.thi.ng/umbrella/random/#random-distributions
 * - https://docs.thi.ng/umbrella/random/functions/normal.html
 *
 * @param a - tensor
 * @param rnd - random distribution function
 * @param n - scale factor
 */
export const randDistrib = top<
	(a: ITensor, rnd?: Fn0<number>, n?: number) => ITensor
>(0, undefined, randDistrib1, <any>randDistrib2, <any>randDistrib3);
