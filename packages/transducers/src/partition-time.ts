// SPDX-License-Identifier: Apache-2.0
import { isIterable } from "@thi.ng/checks/is-iterable";
import { now, timeDiff, type Timestamp } from "@thi.ng/timestamp";
import type { Transducer } from "./api.js";
import { iterator } from "./iterator.js";
import { partitionBy } from "./partition-by.js";

/**
 * Transducer. Yields tumbling, non-overlapping windows/partitions of input
 * values, with the window size defined by given realtime `period` (in
 * milliseconds).
 *
 * @remarks
 * Only to be used in async contexts, NOT with {@link transduce} directly.
 *
 * See also:
 *
 * - [`thi.ng/transducers-async`](https://thi.ng/transducers-async).
 * - [`thi.ng/rstream`](https://thi.ng/rstream)
 *
 * @example
 * ```ts tangle:../export/partition-time.ts
 * import { fromInterval, trace } from "@thi.ng/rstream";
 * import { partitionTime } from "@thi.ng/transducers";
 *
 * // stream emits counter value every 250ms
 * // callect & partition into tuples every 1000ms
 * fromInterval(250)
 *   .transform(partitionTime(1000))
 *   .subscribe(trace())
 * // [ 0, 1, 2, 3 ]
 * // [ 4, 5, 6, 7 ]
 * // [ 8, 9, 10, 11 ]
 * // [ 12, 13, 14, 15 ]
 * // ...
 * ```
 *
 * @param period - window size (in ms)
 */
export function partitionTime<T>(period: number): Transducer<T, T[]>;
export function partitionTime<T>(
	period: number,
	src: Iterable<T>
): IterableIterator<T[]>;
export function partitionTime<T>(period: number, src?: Iterable<T>): any {
	return isIterable(src)
		? iterator(partitionTime(period), src)
		: partitionBy(() => {
				let prev: Timestamp = 0;
				return () => {
					const t = now();
					timeDiff(prev, t) >= period && (prev = t);
					return prev;
				};
		  }, true);
}
