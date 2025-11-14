// SPDX-License-Identifier: Apache-2.0
import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

/**
 * Reducer. Like {@link push}, but for ES6 Sets.
 */
export function conj<T>(): Reducer<T, Set<T>>;
export function conj<T>(src: Iterable<T>): Set<T>;
export function conj<T>(src?: Iterable<T>): any {
	return src
		? reduce(conj(), src)
		: reducer(
				() => new Set(),
				(acc, x) => acc.add(x)
		  );
}
