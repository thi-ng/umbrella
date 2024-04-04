import type { MaybeAsyncIterable } from "@thi.ng/api";
import { ensureReduced, reduced } from "@thi.ng/transducers/reduced";
import type { AsyncReducer, AsyncTransducer } from "./api.js";
import { compR } from "./compr.js";
import { iterator } from "./iterator.js";

export function take<T>(n: number): AsyncTransducer<T, T>;
export function take<T>(
	n: number,
	src: MaybeAsyncIterable<T>
): AsyncIterableIterator<T>;
export function take<T>(n: number, src?: MaybeAsyncIterable<T>) {
	return src
		? iterator(take(n), src)
		: (rfn: AsyncReducer<T, any>) => {
				const reduce = rfn[2];
				let remaining = n;
				return compR<T, T, any>(rfn, async (acc, x) =>
					--remaining > 0
						? reduce(acc, x)
						: remaining === 0
						? ensureReduced(reduce(acc, x))
						: reduced(acc)
				);
		  };
}
