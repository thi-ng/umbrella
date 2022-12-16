import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

/**
 * Reducer. Like {@link push}, but for ES6 Sets.
 */
export function conj<T>(): Reducer<Set<T>, T>;
export function conj<T>(xs: Iterable<T>): Set<T>;
export function conj<T>(xs?: Iterable<T>): any {
	return xs
		? reduce(conj(), xs)
		: reducer(
				() => new Set(),
				(acc, x) => acc.add(x)
		  );
}
