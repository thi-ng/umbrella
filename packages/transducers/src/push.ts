// SPDX-License-Identifier: Apache-2.0
import type { Reducer } from "./api.js";
import { reducer } from "./reduce.js";

/**
 * Reducer which collects inputs into an array.
 *
 * @remarks
 * Also see {@link pushCopy}, {@link pushKeys}, {@link pushSort}.
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
