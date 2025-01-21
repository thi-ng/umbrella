// SPDX-License-Identifier: Apache-2.0
import type { Nullable } from "@thi.ng/api";
import type { Reducer, Transducer } from "./api.js";
import { __iter, iterator } from "./iterator.js";

/**
 * Transducer which receives fixed-`size` tuples of possibly nullish values and
 * only emits tuples which are fully populated (with non-nullish values),
 * keeping track of each component's last valid value and using those to fill
 * empty components if needed.
 *
 * @remarks
 * The following behavior is used:
 * - 1st input: `[null,null]` => no output
 * - 2nd input: `[0, null]` => no output
 * - 3rd input: `[null, 1]` => `[0, 1]`
 * - 4th input: `[1, 2]` => `[1, 2]`
 * - 5th input: `[null, 3]` => `[1, 3]`
 * - 6th input: `[]` => no output
 *
 * @example
 * ```ts tangle:../export/sync-tuples.ts
 * import { syncTuples } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...syncTuples(2, [[], [0], [0, 0], [1, 1], [, 2], []])]
 * );
 * ```
 *
 * @param size
 */
export function syncTuples<T>(size: number): Transducer<Nullable<T>[], T[]>;
export function syncTuples<T>(
	size: number,
	src: Iterable<Nullable<T>[]>
): IterableIterator<T[]>;
export function syncTuples<T>(...args: any[]) {
	const iter = __iter(syncTuples, args, iterator);
	if (iter) return iter;
	const size = args[0];
	return ([init, complete, reduce]: Reducer<T[], any>) => {
		const prev: T[] = new Array(size);
		return [
			init,
			complete,
			(acc: any, x: Nullable<T>[]) => {
				let partial = false;
				let filled = true;
				for (let i = 0; i < size; i++) {
					if (x[i] != null) {
						prev[i] = x[i]!;
						partial = true;
					} else if (prev[i] == null) filled = false;
				}
				return partial && filled ? reduce(acc, prev.slice()) : acc;
			},
		];
	};
}
