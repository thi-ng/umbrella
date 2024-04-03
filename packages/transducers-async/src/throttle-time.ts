import type { MaybeAsyncIterable } from "@thi.ng/api";
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
				let last = 0;
				return () => {
					const t = Date.now();
					return t - last >= delay ? ((last = t), true) : false;
				};
		  });
}
