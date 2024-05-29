import type { Pair } from "@thi.ng/api";
import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

/**
 * Reducer accepting key-value pairs / tuples and transforming / adding
 * them to an ES6 Map. Also see {@link assocObj}.
 */
export function assocMap<A, B>(): Reducer<Pair<A, B>, Map<A, B>>;
export function assocMap<A, B>(src: Iterable<Pair<A, B>>): Map<A, B>;
export function assocMap<A, B>(src?: Iterable<Pair<A, B>>): any {
	return src
		? reduce(assocMap(), src)
		: reducer<Pair<A, B>, Map<A, B>>(
				() => new Map<A, B>(),
				(acc, [k, v]) => acc.set(k, v)
		  );
}
