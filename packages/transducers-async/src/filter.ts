// SPDX-License-Identifier: Apache-2.0
import type {
	AsyncPredicate,
	MaybeAsyncIterable,
	Predicate,
} from "@thi.ng/api";
import type { AsyncReducer, AsyncTransducer } from "./api.js";
import { compR } from "./compr.js";
import { iterator1 } from "./iterator.js";

export function filter<T>(
	fn: AsyncPredicate<T> | Predicate<T>
): AsyncTransducer<T, T>;
export function filter<T>(
	fn: AsyncPredicate<T> | Predicate<T>,
	src: MaybeAsyncIterable<T>
): AsyncIterableIterator<T>;
export function filter<T>(
	fn: AsyncPredicate<T> | Predicate<T>,
	src?: MaybeAsyncIterable<T>
) {
	return src
		? iterator1(filter(fn), src)
		: (rfn: AsyncReducer<T, any>) =>
				compR<T, T, any>(rfn, async (acc, x) =>
					(await fn(x)) ? rfn[2](acc, x) : acc
				);
}
