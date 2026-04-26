import { isPlainObject } from "./is-plain-object.js";

/**
 * Higher order predicate to check if a given value is an object with all values
 * of type `T`. Takes `pred` to check single array items.
 *
 * @remarks
 * Uses `Object.values().every()` with additional pre-check.
 *
 * Also see {@link isArrayOf}, {@link isSetOf}.
 *
 * @param pred
 */
export const isObjectOf =
	<T>(pred: (x: any) => boolean) =>
	(x: any): x is Record<PropertyKey, T> =>
		isPlainObject(x) && Object.values(x).every(pred);
