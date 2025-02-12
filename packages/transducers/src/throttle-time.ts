// SPDX-License-Identifier: Apache-2.0
import { isIterable } from "@thi.ng/checks/is-iterable";
import { now, timeDiff, type Timestamp } from "@thi.ng/timestamp";
import type { Transducer } from "./api.js";
import { iterator1 } from "./iterator.js";
import { throttle } from "./throttle.js";

/**
 * Time-based version of {@link throttle}. Ignores any new values in the `delay`
 * interval since the last accepted value.
 *
 * @remarks
 * Only to be used in async contexts and NOT with {@link transduce} directly.
 *
 * See also:
 *
 * - [`thi.ng/rstream`](https://thi.ng/rstream)
 * - [`thi.ng/csp`](https://thi.ng/csp).
 *
 * @param delay -
 */
export function throttleTime<T>(delay: number): Transducer<T, T>;
export function throttleTime<T>(
	delay: number,
	src: Iterable<T>
): IterableIterator<T>;
export function throttleTime<T>(delay: number, src?: Iterable<T>): any {
	return isIterable(src)
		? iterator1(throttleTime(delay), src)
		: throttle<T>(() => {
				let prev: Timestamp = 0;
				return () => {
					const t = now();
					return timeDiff(prev, t) >= delay
						? ((prev = t), true)
						: false;
				};
		  });
}
