import type { Predicate } from "@thi.ng/api";
import type { Reducer } from "./api.js";
import { $$reduce, reducer } from "./reduce.js";
import { reduced } from "./reduced.js";

/**
 * Reducer which applies optional `pred` function to each value and
 * terminates early if the predicate returned a falsy result. If no
 * predicate is given the values are checked via JS native truthiness
 * rules (i.e. 0, "", false, null, undefined are all falsy).
 *
 * Returns true if *all* values passed test.
 *
 * @example
 * ```ts
 * reduce(every((x)=> x > 0), [1,2,-1,3]);
 * // false
 * ```
 *
 * @param pred -
 */
export function every<T>(pred?: Predicate<T>): Reducer<boolean, T>;
export function every<T>(xs: Iterable<T>): boolean;
export function every<T>(pred: Predicate<T>, xs: Iterable<T>): boolean;
export function every(...args: any[]): any {
	const res = $$reduce(every, args);
	if (res !== undefined) {
		return res;
	}
	const pred = args[0];
	return reducer(
		() => true,
		pred
			? (acc, x) => (pred(x) ? acc : reduced(false))
			: (acc, x) => (x ? acc : reduced(false))
	);
}
