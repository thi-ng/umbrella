import type { Reducer } from "./api.js";
import { reducer } from "./reduce.js";

/**
 * Reducer which collects inputs into a new array.
 */
export function push<T>(): Reducer<T, T[]>;
export function push<T>(src: Iterable<T>): T[];
export function push<T>(src?: Iterable<T>): any {
	return src
		? [...src]
		: reducer<T, T[]>(
				() => [],
				(acc, x) => (acc.push(x), acc)
		  );
}
