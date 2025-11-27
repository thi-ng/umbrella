// SPDX-License-Identifier: Apache-2.0
import type { MaybeAsyncIterable } from "@thi.ng/api";

export function zip<A>(a: MaybeAsyncIterable<A>): AsyncIterableIterator<[A]>;
export function zip<A, B>(
	a: MaybeAsyncIterable<A>,
	b: MaybeAsyncIterable<B>
): AsyncIterableIterator<[A, B]>;
export function zip<A, B, C>(
	a: MaybeAsyncIterable<A>,
	b: MaybeAsyncIterable<B>,
	c: MaybeAsyncIterable<C>
): AsyncIterableIterator<[A, B, C]>;
export function zip<A, B, C, D>(
	a: MaybeAsyncIterable<A>,
	b: MaybeAsyncIterable<B>,
	c: MaybeAsyncIterable<C>,
	d: MaybeAsyncIterable<D>
): AsyncIterableIterator<[A, B, C, D]>;
export function zip<A, B, C, D, E>(
	a: MaybeAsyncIterable<A>,
	b: MaybeAsyncIterable<B>,
	c: MaybeAsyncIterable<C>,
	d: MaybeAsyncIterable<D>,
	e: MaybeAsyncIterable<E>
): AsyncIterableIterator<[A, B, C, D, E]>;
export function zip<A, B, C, D, E, F>(
	a: MaybeAsyncIterable<A>,
	b: MaybeAsyncIterable<B>,
	c: MaybeAsyncIterable<C>,
	d: MaybeAsyncIterable<D>,
	e: MaybeAsyncIterable<E>,
	f: MaybeAsyncIterable<F>
): AsyncIterableIterator<[A, B, C, D, E, F]>;
export function zip<A, B, C, D, E, F, G>(
	a: MaybeAsyncIterable<A>,
	b: MaybeAsyncIterable<B>,
	c: MaybeAsyncIterable<C>,
	d: MaybeAsyncIterable<D>,
	e: MaybeAsyncIterable<E>,
	f: MaybeAsyncIterable<F>,
	g: MaybeAsyncIterable<G>
): AsyncIterableIterator<[A, B, C, D, E, F, G]>;
export function zip<A, B, C, D, E, F, G, H>(
	a: MaybeAsyncIterable<A>,
	b: MaybeAsyncIterable<B>,
	c: MaybeAsyncIterable<C>,
	d: MaybeAsyncIterable<D>,
	e: MaybeAsyncIterable<E>,
	f: MaybeAsyncIterable<F>,
	g: MaybeAsyncIterable<G>,
	h: MaybeAsyncIterable<H>
): AsyncIterableIterator<[A, B, C, D, E, F, G, H]>;
export async function* zip(
	...src: MaybeAsyncIterable<any>[]
): AsyncIterableIterator<any[]> {
	const iters: (Iterator<any> | AsyncIterator<any>)[] = src.map(
		(s: any) => s[Symbol.iterator]?.() || s[Symbol.asyncIterator]?.()
	);
	while (true) {
		const tuple = [];
		for (const i of iters) {
			let v = await i.next();
			if (v.done) return;
			tuple.push(v.value);
		}
		yield tuple;
	}
}
