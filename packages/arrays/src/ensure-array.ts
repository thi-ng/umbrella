import { isArray, isArrayLike } from "@thi.ng/checks";
import { ensureIterable } from "./ensure-iterable";

/**
 * Helper function to avoid unnecessary copying if `x` is already an
 * array. First checks if `x` is an array and if so returns it. Else
 * attempts to obtain an iterator from `x` and if successful collects it
 * as array and returns it. Throws error if `x` isn't iterable.
 *
 * @param x
 */
export const ensureArray = (x: any): any[] =>
    isArray(x) ? x : [...ensureIterable(x)];

/**
 * Similar to `ensureArray()`, but for `ArrayLike` types.
 *
 * @see ensureArray
 *
 * @param x
 */
export const ensureArrayLike = (x: any): ArrayLike<any> =>
    isArrayLike(x) ? x : [...ensureIterable(x)];
