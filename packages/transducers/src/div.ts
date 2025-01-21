// SPDX-License-Identifier: Apache-2.0
import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

/**
 * Reducer to compute successive division of values using given `init`
 * value.
 */
export function div(init: number): Reducer<number, number>;
export function div(init: number, src: Iterable<number>): number;
export function div(init: number, src?: Iterable<number>): any {
	return src
		? reduce(div(init), src)
		: reducer(
				() => init,
				(acc, x: number) => acc / x
		  );
}
