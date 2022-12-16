import type { SortOpts, Transducer } from "./api.js";
import { comp } from "./comp.js";
import { __sortOpts } from "./internal/sort-opts.js";
import { __iter, iterator } from "./iterator.js";
import { mapcat } from "./mapcat.js";
import { partition } from "./partition.js";

/**
 * Transducer. Composition of {@link partition} and
 * {@link mapcat} which yields a **partially** sorted sequence of
 * input values. Sorting is performed on sliding / non-overlapping
 * chunks of `n` inputs.
 *
 * @remarks
 * The optional `key` and `cmp` function args can be used to select /
 * compute a sortable value and change sorting behavior.
 *
 * @example
 * ```ts
 * [...partitionSort(4, [5,9,2,6,4,1,3,8,7,0])]
 * // [ 2, 5, 6, 9, 1, 3, 4, 8, 0, 7 ]
 *
 * // with key fn and custom comparator
 * [...partitionSort(3, (x) => x.val, (a, b) => b - a,
 *   [
 *     { id: "a", val: 5 },
 *     { id: "b", val: 7 },
 *     { id: "c", val: 8 }
 *   ]
 * )]
 * // [ { id: 'c', val: 8 }, { id: 'b', val: 7 }, { id: 'a', val: 5 } ]
 * ```
 *
 * @param n - window size
 * @param key - sort key lookup
 * @param cmp - comparator
 */
export function partitionSort<A, B>(
	n: number,
	opts?: Partial<SortOpts<A, B>>
): Transducer<A, A>;
export function partitionSort<A, B>(
	n: number,
	src: Iterable<A>
): IterableIterator<A>;
export function partitionSort<A, B>(
	n: number,
	opts: Partial<SortOpts<A, B>>,
	src: Iterable<A>
): IterableIterator<A>;
export function partitionSort<A, B>(...args: any[]): any {
	const iter = __iter(partitionSort, args, iterator);
	if (iter) {
		return iter;
	}
	const { key, compare } = __sortOpts<A, B>(args[1]);
	return comp<A, A[], A>(
		partition(args[0], true),
		mapcat((window: A[]) =>
			window.slice().sort((a, b) => compare(key(a), key(b)))
		)
	);
}
