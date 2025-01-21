// SPDX-License-Identifier: Apache-2.0
import type { Predicate, TypedArray } from "@thi.ng/api";

/**
 * Splits array at given index (default: floor(src.length/2)) and returns tuple
 * of [lhs, rhs].
 *
 * @param src -
 * @param index -
 */
export function bisect<T>(src: T[], index?: number): [T[], T[]];
export function bisect<T extends TypedArray>(src: T, index?: number): [T, T];
export function bisect(src: any[] | TypedArray, index = src.length >>> 1) {
	return [src.slice(0, index), src.slice(index)];
}

/**
 * Similar to {@link bisect}, but first finds split index via provided
 * predicate. The item for which the predicate first returns a truthy result,
 * will be the first item in the RHS array. If the predicate never succeeds, the
 * function returns `[src, []]`, i.e. all items will remain in the LHS.
 *
 * @param src -
 * @param pred -
 */
export function bisectWith<T>(src: T[], pred: Predicate<T>): [T[], T[]];
export function bisectWith<T extends TypedArray>(
	src: T,
	pred: Predicate<number>
): [T, T];
export function bisectWith(src: any[] | TypedArray, pred: Predicate<any>) {
	const i = src.findIndex(pred);
	return i >= 0 ? bisect(<any>src, i) : [src, src.slice(0, 0)];
}
