import type { Fn } from "@thi.ng/api";
import { identity } from "@thi.ng/compose/identity";
import type { Reducer } from "./api.js";
import { count } from "./count.js";
import { groupByMap } from "./group-by-map.js";
import { $$reduce } from "./reduce.js";

/**
 * Reducer. Similar to {@link frequencies}, but instead of a Map produces an
 * array of `[value, frequency]`-pairs, sorted by the descending number of
 * occurrences of each distinct value.
 *
 * @example
 * ```ts tangle:../export/sorted-frequencies.ts
 * import { filter, sortedFrequencies, transduce } from "@thi.ng/transducers";
 *
 * const input = "hello, world! this transducers-stuff is pretty awesome! :)";
 *
 * const freqs = transduce(
 *   filter(x => /[a-z0-9]/.test(x)),
 *   sortedFrequencies(),
 *   input
 * );
 *
 * console.log(freqs);
 * // [
 * //   [ 's', 6 ], [ 'e', 5 ], [ 't', 5 ], [ 'r', 4 ],
 * //   [ 'l', 3 ], [ 'o', 3 ], [ 'h', 2 ], [ 'w', 2 ],
 * //   [ 'd', 2 ], [ 'i', 2 ], [ 'a', 2 ], [ 'u', 2 ],
 * //   [ 'f', 2 ], [ 'n', 1 ], [ 'c', 1 ], [ 'p', 1 ],
 * //   [ 'y', 1 ], [ 'm', 1 ]
 * // ]
 * ```
 */
export function sortedFrequencies<A>(): Reducer<A, [A, number][]>;
export function sortedFrequencies<A>(src: Iterable<A>): [A, number][];
export function sortedFrequencies<A, B>(
	key: Fn<A, B>
): Reducer<A, [B, number][]>;
export function sortedFrequencies<A, B>(
	key: Fn<A, B>,
	src: Iterable<A>
): Map<B, number>;
export function sortedFrequencies(...args: any[]): any {
	const res = $$reduce(sortedFrequencies, args);
	if (res) return res;
	const [init, complete, reduce] = groupByMap({
		key: args[0] || identity,
		group: count(),
	});
	return <Reducer<any, any>>[
		init,
		(acc) => [...complete(acc)].sort((a, b) => b[1] - a[1]),
		(acc, x) => reduce(acc, x),
	];
}
