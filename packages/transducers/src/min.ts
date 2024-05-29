import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

export function min(): Reducer<number, number>;
export function min(src: Iterable<number>): number;
export function min(src?: Iterable<number>): any {
	return src
		? reduce(min(), src)
		: reducer(
				() => Infinity,
				(acc, x: number) => Math.min(acc, x)
		  );
}
