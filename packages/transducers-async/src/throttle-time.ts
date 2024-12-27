import type { MaybeAsyncIterable } from "@thi.ng/api";
import { now, timeDiff, type Timestamp } from "@thi.ng/timestamp";
import type { AsyncTransducer } from "./api.js";
import { iterator1 } from "./iterator.js";
import { throttle } from "./throttle.js";

export function throttleTime<T>(delay: number): AsyncTransducer<T, T>;
export function throttleTime<T>(
	delay: number,
	src: MaybeAsyncIterable<T>
): AsyncIterableIterator<T>;
export function throttleTime<T>(delay: number, src?: MaybeAsyncIterable<T>) {
	return src
		? iterator1(throttleTime(delay), src)
		: throttle(() => {
				let prev: Timestamp = 0;
				return () => {
					const t = now();
					return timeDiff(prev, t) >= delay
						? ((prev = t), true)
						: false;
				};
		  });
}
