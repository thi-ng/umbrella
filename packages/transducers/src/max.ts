// SPDX-License-Identifier: Apache-2.0
import type { Reducer } from "./api.js";
import { reduce, reducer } from "./reduce.js";

export function max(): Reducer<number, number>;
export function max(src: Iterable<number>): number;
export function max(src?: Iterable<number>): any {
	return src
		? reduce(max(), src)
		: reducer(
				() => -Infinity,
				(acc, x: number) => Math.max(acc, x)
		  );
}
