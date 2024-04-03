import type { IObjectOf, Pair } from "@thi.ng/api";
import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

/**
 * Reducer accepting key-value pairs / tuples and updating / adding them
 * to an object.
 */
export function assocObj<T>(): Reducer<Pair<PropertyKey, T>, IObjectOf<T>>;
export function assocObj<T>(xs: Iterable<Pair<PropertyKey, T>>): IObjectOf<T>;
export function assocObj<T>(xs?: Iterable<Pair<PropertyKey, T>>): any {
	return xs
		? reduce(assocObj(), xs)
		: reducer<Pair<PropertyKey, T>, IObjectOf<T>>(
				() => ({}),
				(acc, [k, v]) => ((acc[<any>k] = v), acc)
		  );
}
