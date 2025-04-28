import type { Fn, Predicate2 } from "@thi.ng/api";
import { identity } from "@thi.ng/api/fn";
import type { ITensor } from "./api.js";
import type { Tensor1, Tensor2, Tensor3 } from "./tensor.js";
import { top } from "./top.js";

/**
 * Result type of {@link select}.
 */
export type SelectResult<T> = { arg: number[]; value: T };

/** @internal */
const lt: Predicate2<any> = (a, b) => a < b;

/** @internal */
const gt: Predicate2<any> = (a, b) => a > b;

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
		shape: [n],
		stride: [ta],
	} = a;
	const arg: number[] = [-1];
	let value = initial;
	for (let i = 0; i < n; i++) {
		const x = xform(data[offset + i * ta]);
		if (pred(x, value)) {
			value = x;
			arg[0] = i;
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
		shape: [rows, cols],
		stride: [tx, ty],
	} = a;
	const arg: number[] = [-1, -1];
	let value = initial;
	for (let i = 0; i < rows; i++) {
		const $off = offset + i * tx;
		for (let j = 0; j < cols; j++) {
			const x = xform(data[$off + j * ty]);
			if (pred(x, value)) {
				value = x;
				arg[0] = i;
				arg[1] = j;
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
		shape: [slices, rows, cols],
		stride: [tx, ty, tz],
	} = a;
	const arg: number[] = [-1, -1, -1];
	let value = initial;
	for (let i = 0; i < slices; i++) {
		const slice = offset + i * tx;
		for (let j = 0; j < rows; j++) {
			const row = slice + j * ty;
			for (let k = 0; k < cols; k++) {
				const x = xform(data[row + k * tz]);
				if (pred(x, value)) {
					value = x;
					arg[0] = i;
					arg[1] = j;
					arg[2] = k;
				}
			}
		}
	}
	return { arg, value };
};

/** @internal */
const __select = top<any>(0, undefined, select1, select2, select3);

/**
 * Uses given value transform `xform` and predicate `pred` to select a specific
 * component value and its position in the tensor. The `initial` value is used
 * to seed the search.
 *
 * @remark
 * This function is a generalization of {@link argMin} and {@link argMax} and
 * customizable via arbitrary predicates.
 *
 * @example
 * ```ts
 * import { select, tensor } from "@thi.ng/tensors";
 *
 * const a = tensor("i8", [2, 2], { data: [1, -2, -3, 4] });
 *
 * // select smallest value
 * console.log(select(a, (x) => x, (a,b) => a < b, Infinity));
 * // { arg: [1,0], value: -3 }
 *
 * // select smallest absolute value
 * console.log(select(a, Math.abs, (a,b) => a < b, Infinity));
 * // { arg: [0,0], value: 1 }
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
 * Syntax sugar for {@link select} to find the smallest component value and its
 * position in a tensor.
 *
 * @param a
 */
export const argMin = (a: ITensor): SelectResult<number> =>
	__select(a, identity, lt, Infinity);

/**
 * Syntax sugar for {@link select} to find the largest component value and its
 * position in a tensor.
 *
 * @param a
 */
export const argMax = (a: ITensor): SelectResult<number> =>
	__select(a, identity, gt, -Infinity);
