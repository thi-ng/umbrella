import type { Reducer } from "./api.js";
import { $$reduce, reducer } from "./reduce.js";

/**
 * Reducer which ignores incoming values and instead only counts them,
 * optionally using given `start` and `step` counter values.
 *
 * @param offset -
 * @param step -
 */
export function count(offset?: number, step?: number): Reducer<any, number>;
export function count(xs: Iterable<any>): number;
export function count(offset: number, xs: Iterable<any>): number;
export function count(offset: number, step: number, xs: Iterable<any>): number;
export function count(...args: any[]): any {
	const res = $$reduce(count, args);
	if (res !== undefined) {
		return res;
	}
	const [offset = 0, step = 1] = <number[]>args;
	return reducer(
		() => offset,
		(acc, _) => acc + step
	);
}
