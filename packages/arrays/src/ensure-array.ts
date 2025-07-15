// SPDX-License-Identifier: Apache-2.0
import { isArray } from "@thi.ng/checks/is-array";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { ensureIterable } from "./ensure-iterable.js";

/**
 * Helper function to avoid unnecessary copying if `x` is already an
 * array.
 *
 * @remarks
 * First checks if `x` is an array and if so returns it. Else attempts
 * to obtain an iterator from `x` and if successful collects it as array
 * and returns it. Throws error if `x` isn't iterable.
 *
 * @param x -
 */
export const ensureArray = <T = any>(x: any): T[] =>
	isArray(x) ? x : [...ensureIterable(x)];

/**
 * Similar to {@link ensureArray}, but for `ArrayLike` types.
 *
 * {@link ensureArray}
 *
 * @param x -
 */
export const ensureArrayLike = <T = any>(x: any): ArrayLike<T> =>
	isArrayLike(x) ? x : [...ensureIterable(x)];
