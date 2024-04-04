import type {
	AsyncStatefulPredicate,
	MaybeAsyncIterable,
	StatefulPredicate,
} from "@thi.ng/api";
import type { AsyncReducer, AsyncTransducer } from "./api.js";
import { compR } from "./compr.js";
import { iterator1 } from "./iterator.js";

export function throttle<T>(
	pred: AsyncStatefulPredicate<T> | StatefulPredicate<T>
): AsyncTransducer<T, T>;
export function throttle<T>(
	pred: AsyncStatefulPredicate<T> | StatefulPredicate<T>,
	src: MaybeAsyncIterable<T>
): AsyncIterableIterator<T>;
export function throttle<T>(
	pred: AsyncStatefulPredicate<T> | StatefulPredicate<T>,
	src?: MaybeAsyncIterable<T>
) {
	return src
		? iterator1(throttle(pred), src)
		: (rfn: AsyncReducer<T, any>) => {
				const reduce = rfn[2];
				const $pred = pred();
				return compR<T, T, any>(rfn, async (acc, x) =>
					(await $pred(x)) ? reduce(acc, x) : acc
				);
		  };
}
