import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

/**
 * Reducer which returns the value with the largest magnitude, regardless of
 * sign.
 */
export function maxMag(): Reducer<number, number>;
export function maxMag(src: Iterable<number>): number;
export function maxMag(src?: Iterable<number>): any {
	return src
		? reduce(maxMag(), src)
		: reducer(
				() => 0,
				(acc, x: number) => (Math.abs(x) > Math.abs(acc) ? x : acc)
		  );
}
