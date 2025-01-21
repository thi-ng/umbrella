// SPDX-License-Identifier: Apache-2.0
import type { FnAny, MaybeAsyncIterable } from "@thi.ng/api";
import { NO_OP, SEMAPHORE } from "@thi.ng/api/api";
import { isAsyncIterable } from "@thi.ng/checks/is-async-iterable";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isReduced } from "@thi.ng/transducers/reduced";
import type { AsyncReducer, AsyncTransducer, AsyncTxLike } from "./api.js";
import { ensureAsyncTransducer } from "./ensure.js";
import { push } from "./push.js";

export async function* iterator1<A, B>(
	xform: AsyncTxLike<A, B>,
	src: MaybeAsyncIterable<A>
): AsyncIterableIterator<B> {
	const [_, complete, reduce] = <AsyncReducer<A, B>>(
		ensureAsyncTransducer(xform)(<any>[NO_OP, NO_OP, (_: any, x: A) => x])
	);
	for await (let x of src) {
		let y = await reduce(<any>SEMAPHORE, x);
		if (isReduced<B>(y)) {
			const res = await complete(y.deref());
			if (<any>res !== SEMAPHORE) {
				yield res;
			}
			return;
		}
		if (<any>y !== SEMAPHORE) {
			yield <B>y;
		}
	}
}

export async function* iterator<A, B>(
	xform: AsyncTxLike<A, B>,
	src: MaybeAsyncIterable<A>
): AsyncIterableIterator<B> {
	const [_, complete, reduce]: AsyncReducer<A, B[]> = ensureAsyncTransducer(
		xform
	)(push());
	for await (let x of src) {
		const y = await reduce([], x);
		if (isReduced(y)) {
			yield* await complete(y.deref());
			return;
		}
		if (y.length) {
			yield* y;
		}
	}
	yield* await complete([]);
}

export const __iter = (
	xform: FnAny<AsyncTransducer<any, any>>,
	args: any[],
	impl = iterator1
) => {
	const n = args.length - 1;
	return isIterable(args[n]) || isAsyncIterable(args[n])
		? args.length > 1
			? impl(xform.apply(null, args.slice(0, n)), args[n])
			: impl(xform(), args[0])
		: undefined;
};
