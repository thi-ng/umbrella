// SPDX-License-Identifier: Apache-2.0
import type { Reducer } from "./api.js";
import { $$reduce } from "./reduce.js";

/**
 * Similar to {@link count}, a reducer which ignores incoming values and instead
 * only counts them, finally yielding a value normalized to given `norm` (i.e. a
 * percentage).
 *
 * @remarks
 * Also see {@link normFrequencies} which uses this reducer to create a
 * normalized histogram.
 *
 * @example
 * ```ts tangle:../export/norm-count.ts
 * import { filter, normCount, transduce } from "@thi.ng/transducers";
 *
 * const items = [1,2,3,1,1,4,2,5,1,2];
 *
 * // compute percentage of values < 3
 * console.log(
 *   transduce(filter(x => x<3), normCount(items.length), items)
 * );
 * // 0.7
 * ```
 *
 * @param norm -
 */
export function normCount(norm: number): Reducer<any, number>;
export function normCount(norm: number, src: Iterable<any>): number;
export function normCount(...args: any[]): any {
	const res = $$reduce(normCount, args);
	if (res !== undefined) return res;
	const norm: number = args[0];
	return [() => 0, (acc: number) => acc / norm, (acc: number) => acc + 1];
}
