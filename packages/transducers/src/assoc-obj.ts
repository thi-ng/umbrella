import type { IObjectOf, Pair } from "@thi.ng/api";
import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

/**
 * Reducer accepting key-value pairs / tuples and updating / adding them
 * to an object. Also see {@link assocMap}.
 */
export function assocObj<T>(): Reducer<Pair<PropertyKey, T>, IObjectOf<T>>;
export function assocObj<T>(src: Iterable<Pair<PropertyKey, T>>): IObjectOf<T>;
export function assocObj<T>(src?: Iterable<Pair<PropertyKey, T>>): any {
	return src
		? reduce(assocObj(), src)
		: reducer<Pair<PropertyKey, T>, IObjectOf<T>>(
				() => ({}),
				(acc, [k, v]) => ((acc[<any>k] = v), acc)
		  );
}
