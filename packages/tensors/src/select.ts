// SPDX-License-Identifier: Apache-2.0
import type { Fn, Predicate2 } from "@thi.ng/api";
import { identity } from "@thi.ng/api/fn";
import type { ITensor, ITensor1, ITensor2, ITensor3, ITensor4 } from "./api.js";
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
export const select1 = <A, B>(
	a: ITensor1<A>,
	xform: Fn<A, B>,
	pred: Predicate2<B>,
	initial: B
): SelectResult<B> => {
	const {
		data,
		offset,
		shape: [sx],
		stride: [tx],
	} = a;
	const arg: number[] = [-1];
	let value = initial,
		v: B;
	for (let x = 0; x < sx; x++) {
		v = xform(data[offset + x * tx]);
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
export const select2 = <A, B>(
	a: ITensor2<A>,
	xform: Fn<A, B>,
	pred: Predicate2<B>,
	initial: B
): SelectResult<B> => {
	const {
		data,
		offset,
		shape: [sx, sy],
		stride: [tx, ty],
	} = a;
	const arg: number[] = [-1, -1];
	let value = initial,
		v: B;
	let ox: number, x: number, y: number;
	for (x = 0; x < sx; x++) {
		ox = offset + x * tx;
		for (y = 0; y < sy; y++) {
			v = xform(data[ox + y * ty]);
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
export const select3 = <A, B>(
	a: ITensor3<A>,
	xform: Fn<A, B>,
	pred: Predicate2<B>,
	initial: B
): SelectResult<B> => {
	const {
		data,
		offset,
		shape: [sx, sy, sz],
		stride: [tx, ty, tz],
	} = a;
	const arg: number[] = [-1, -1, -1];
	let value = initial,
		v: B;
	let ox: number, oy: number, x: number, y: number, z: number;
	for (x = 0; x < sx; x++) {
		ox = offset + x * tx;
		for (y = 0; y < sy; y++) {
			oy = ox + y * ty;
			for (z = 0; z < sz; z++) {
				v = xform(data[oy + z * tz]);
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
export const select4 = <A, B>(
	a: ITensor4<A>,
	xform: Fn<A, B>,
	pred: Predicate2<B>,
	initial: B
): SelectResult<B> => {
	const {
		data,
		offset,
		shape: [sx, sy, sz, sw],
		stride: [tx, ty, tz, tw],
	} = a;
	const arg: number[] = [-1, -1, -1, -1];
	let value = initial,
		v: B;
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
					v = xform(data[oz + w * tw]);
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
export const select = <A, B>(
	a: ITensor<A>,
	xform: Fn<A, B>,
	pred: Predicate2<B>,
	initial: B
): SelectResult<B> => __select(a, xform, pred, initial);

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
