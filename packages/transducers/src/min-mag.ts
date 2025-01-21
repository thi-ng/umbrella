// SPDX-License-Identifier: Apache-2.0
import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

/**
 * Reducer which returns the value with the smallest magnitude, regardless of
 * sign.
 */
export function minMag(): Reducer<number, number>;
export function minMag(src: Iterable<number>): number;
export function minMag(src?: Iterable<number>): any {
	return src
		? reduce(minMag(), src)
		: reducer(
				() => Infinity,
				(acc, x: number) => (Math.abs(x) < Math.abs(acc) ? x : acc)
		  );
}
