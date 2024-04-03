import type { Fn, MaybeAsyncIterable, MaybePromise } from "@thi.ng/api";
import type { AsyncReducer, AsyncTransducer } from "./api.js";
import { compR } from "./compr.js";
import { iterator1 } from "./iterator.js";

export function map<A, B>(fn: Fn<A, MaybePromise<B>>): AsyncTransducer<A, B>;
export function map<A, B>(
	fn: Fn<A, MaybePromise<B>>,
	src: MaybeAsyncIterable<A>
): AsyncIterableIterator<B>;
export function map<A, B>(
	fn: Fn<A, MaybePromise<B>>,
	src?: MaybeAsyncIterable<A>
) {
	return src
		? iterator1(map(fn), src)
		: (rfn: AsyncReducer<B, any>) =>
				compR<A, B, any>(rfn, async (acc, x) =>
					rfn[2](acc, await fn(x))
				);
}
