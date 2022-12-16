import { isIterable } from "@thi.ng/checks/is-iterable";
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
 * Also see:
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
				let last = 0;
				return () => {
					const t = Date.now();
					return t - last >= delay ? ((last = t), true) : false;
				};
		  });
}
