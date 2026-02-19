// SPDX-License-Identifier: Apache-2.0
import type { Fn0 } from "@thi.ng/api";
import { normal as op } from "@thi.ng/random/distributions/normal";
import type {
	ITensor,
	ITensor0,
	ITensor1,
	ITensor2,
	ITensor3,
	ITensor4,
} from "./api.js";
import { top } from "./top.js";

export const randDistrib0 = (a: ITensor0, rnd = op(), n = 1) => {
	a.data[a.offset] = rnd() * n;
	return a;
};

/**
 * Same as {@link randDistrib} for 1D tensors.
 *
 * @param a
 * @param rnd
 * @param n
 */
export const randDistrib1 = (a: ITensor1, rnd = op(), n = 1) => {
	const {
		data,
		offset,
		shape: [sx],
		stride: [tx],
	} = a;
	for (let x = 0; x < sx; x++) data[offset + x * tx] = rnd() * n;
	return a;
};

/**
 * Same as {@link randDistrib} for 2D tensors.
 *
 * @param a
 * @param rnd
 * @param n
 */
export const randDistrib2 = (a: ITensor2, rnd = op(), n = 1) => {
	const {
		data,
		offset,
		shape: [sx, sy],
		stride: [tx, ty],
	} = a;
	let ox: number, x: number, y: number;
	for (x = 0; x < sx; x++) {
		ox = offset + x * tx;
		for (y = 0; y < sy; y++) {
			data[ox + y * ty] = rnd() * n;
		}
	}
	return a;
};

/**
 * Same as {@link randDistrib} for 3D tensors.
 *
 * @param a
 * @param rnd
 * @param n
 */
export const randDistrib3 = (a: ITensor3, rnd = op(), n = 1) => {
	const {
		data,
		offset,
		shape: [sx, sy, sz],
		stride: [tx, ty, tz],
	} = a;
	let ox: number, oy: number, x: number, y: number, z: number;
	for (x = 0; x < sx; x++) {
		ox = offset + x * tx;
		for (y = 0; y < sy; y++) {
			oy = ox + y * ty;
			for (z = 0; z < sz; z++) {
				data[oy + z * tz] = rnd() * n;
			}
		}
	}
	return a;
};

/**
 * Same as {@link randDistrib} for 3D tensors.
 *
 * @param a
 * @param rnd
 * @param n
 */
export const randDistrib4 = (a: ITensor4, rnd = op(), n = 1) => {
	const {
		data,
		offset,
		shape: [sx, sy, sz, sw],
		stride: [tx, ty, tz, tw],
	} = a;
	let ox: number,
		oy: number,
		oz: number,
		x: number,
		y: number,
		z: number,
		w: number;
	for (x = 0; x < sx; x++) {
		ox = offset + x * tx;
		for (y = 0; y < sy; y++) {
			oy = ox + y * ty;
			for (z = 0; z < sz; z++) {
				oz = oy + z * tz;
				for (w = 0; w < sw; w++) {
					data[oz + w * tw] = rnd() * n;
				}
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
	<T extends ITensor>(a: T, rnd?: Fn0<number>, n?: number) => T
>(
	0,
	<any>randDistrib0,
	<any>randDistrib1,
	<any>randDistrib2,
	<any>randDistrib3,
	<any>randDistrib4
);
