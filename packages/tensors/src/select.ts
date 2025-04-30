// SPDX-License-Identifier: Apache-2.0
import type { Fn, Predicate2 } from "@thi.ng/api";
import { identity } from "@thi.ng/api/fn";
import type { ITensor } from "./api.js";
import type { Tensor1, Tensor2, Tensor3 } from "./tensor.js";
import { top } from "./top.js";

/**
 * Result type of {@link select}.
 */
export type SelectResult<T> = { arg: number[]; value: T };

/**
 * Same as {@link select} for 1D tensors.
 *
 * @param a
 * @param xform
 * @param pred
 * @param initial
 */
export const select1 = <T>(
	a: Tensor1<T>,
	xform: Fn<T, T>,
	pred: Predicate2<T>,
	initial: T
): SelectResult<T> => {
	const {
		data,
		offset,
		shape: [sx],
		stride: [tx],
	} = a;
	const arg: number[] = [-1];
	let value = initial;
	for (let x = 0; x < sx; x++) {
		const v = xform(data[offset + x * tx]);
		if (pred(v, value)) {
			value = v;
			arg[0] = x;
		}
	}
	return { arg, value };
};

/**
 * Same as {@link select} for 2D tensors.
 *
 * @param a
 * @param xform
 * @param pred
 * @param initial
 */
export const select2 = <T>(
	a: Tensor2<T>,
	xform: Fn<T, T>,
	pred: Predicate2<T>,
	initial: T
): SelectResult<T> => {
	const {
		data,
		offset,
		shape: [sx, sy],
		stride: [tx, ty],
	} = a;
	const arg: number[] = [-1, -1];
	let value = initial;
	for (let x = 0; x < sx; x++) {
		const ox = offset + x * tx;
		for (let y = 0; y < sy; y++) {
			const v = xform(data[ox + y * ty]);
			if (pred(v, value)) {
				value = v;
				arg[0] = x;
				arg[1] = y;
			}
		}
	}
	return { arg, value };
};

/**
 * Same as {@link select} for 3D tensors.
 *
 * @param a
 * @param xform
 * @param pred
 * @param initial
 */
export const select3 = <T>(
	a: Tensor3<T>,
	xform: Fn<T, T>,
	pred: Predicate2<T>,
	initial: T
): SelectResult<T> => {
	const {
		data,
		offset,
		shape: [sx, sy, sz],
		stride: [tx, ty, tz],
	} = a;
	const arg: number[] = [-1, -1, -1];
	let value = initial;
	for (let x = 0; x < sx; x++) {
		const ox = offset + x * tx;
		for (let y = 0; y < sy; y++) {
			const oy = ox + y * ty;
			for (let z = 0; z < sz; z++) {
				const v = xform(data[oy + z * tz]);
				if (pred(v, value)) {
					value = v;
					arg[0] = x;
					arg[1] = y;
					arg[2] = z;
				}
			}
		}
	}
	return { arg, value };
};

/**
 * Same as {@link select} for 4D tensors.
 *
 * @param a
 * @param xform
 * @param pred
 * @param initial
 */
export const select4 = <T>(
	a: Tensor3<T>,
	xform: Fn<T, T>,
	pred: Predicate2<T>,
	initial: T
): SelectResult<T> => {
	const {
		data,
		offset,
		shape: [sx, sy, sz, sw],
		stride: [tx, ty, tz, tw],
	} = a;
	const arg: number[] = [-1, -1, -1, -1];
	let value = initial;
	for (let x = 0; x < sx; x++) {
		const ox = offset + x * tx;
		for (let y = 0; y < sy; y++) {
			const oy = ox + y * ty;
			for (let z = 0; z < sz; z++) {
				const oz = oy + z * tz;
				for (let w = 0; w < sw; w++) {
					const v = xform(data[oz + w * tw]);
					if (pred(v, value)) {
						value = v;
						arg[0] = x;
						arg[1] = y;
						arg[2] = z;
						arg[3] = w;
					}
				}
			}
		}
	}
	return { arg, value };
};

/** @internal */
const __select = top<any>(0, undefined, select1, select2, select3, select4);

/**
 * Uses given value transform `xform` and predicate `pred` to select a specific
 * component value and its position in the tensor. The `initial` value is used
 * to seed the search.
 *
 * @remarks
 * This function is a generalization of {@link argMin}/{@link argMax}-like
 * functionality and customizable via arbitrary predicates.
 *
 * @example
 * ```ts
 * import { select, tensor } from "@thi.ng/tensors";
 *
 * const a = tensor("i8", [2, 2], { data: [1, -2, -3, 4] });
 *
 * // select smallest value
 * console.log(select(a, (x) => x, (a,b) => a < b, Infinity));
 * // { arg: [1, 0], value: -3 }
 *
 * // select smallest absolute value
 * console.log(select(a, Math.abs, (a,b) => a < b, Infinity));
 * // { arg: [0, 0], value: 1 }
 * ```
 *
 * @param a
 * @param xform
 * @param pred
 * @param initial
 */
export const select = <T>(
	a: ITensor<T>,
	xform: Fn<T, T>,
	pred: Predicate2<T>,
	initial: T
): SelectResult<T> => __select(a, xform, pred, initial);

/**
 * Syntax sugar for {@link select} to find the minimum component value and its
 * position in a tensor.
 *
 * @param a
 */
export const argMin = (a: ITensor): SelectResult<number> =>
	__select(a, identity, (a: any, b: any) => a < b, Infinity);

/**
 * Syntax sugar for {@link select} to find the maximum component value and its
 * position in a tensor.
 *
 * @param a
 */
export const argMax = (a: ITensor): SelectResult<number> =>
	__select(a, identity, (a: any, b: any) => a > b, -Infinity);
