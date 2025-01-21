// SPDX-License-Identifier: Apache-2.0
import type { MaybeAsyncIterable } from "@thi.ng/api";
import type { AsyncReducer, AsyncTxLike } from "./api.js";
import { ensureAsyncTransducer } from "./ensure.js";
import { reduce } from "./reduce.js";

export function transduce<A, B, C>(
	xform: AsyncTxLike<A, B>,
	reducer: AsyncReducer<B, C>,
	src: MaybeAsyncIterable<A>
): Promise<C>;
export function transduce<A, B, C>(
	xform: AsyncTxLike<A, B>,
	reducer: AsyncReducer<B, C>,
	acc: C,
	src: MaybeAsyncIterable<A>
): Promise<C>;
export function transduce<A, B, C>(
	xform: AsyncTxLike<A, B>,
	reducer: AsyncReducer<B, C>,
	...args: [any, any?]
) {
	return reduce<A, C>(ensureAsyncTransducer(xform)(reducer), ...args);
}
