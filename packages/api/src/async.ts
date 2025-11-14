// SPDX-License-Identifier: Apache-2.0
import type {
	Fn,
	Fn0,
	Fn10,
	Fn2,
	Fn3,
	Fn4,
	Fn5,
	Fn6,
	Fn7,
	Fn8,
	Fn9,
	FnAny,
} from "./fn.js";

export type MaybePromise<T> = T | Promise<T>;

export type MaybeAsyncIterable<T> = Iterable<T> | AsyncIterable<T>;

export type MaybeAsyncGenerator<T> =
	| IterableIterator<T>
	| AsyncIterableIterator<T>;

export type AsyncPredicate<T> = FnA<T, boolean>;

export type AsyncPredicate2<T> = FnA2<T, T, boolean>;

export type AsyncStatefulPredicate<T> = Fn0<AsyncPredicate<T>>;

export type AsyncStatefulPredicate2<T> = Fn0<AsyncPredicate2<T>>;

export type Fn0A<A> = Fn0<Promise<A>>;

export type FnA<A, B> = Fn<A, Promise<B>>;

export type FnA2<A, B, C> = Fn2<A, B, Promise<C>>;

export type FnA3<A, B, C, D> = Fn3<A, B, C, Promise<D>>;

export type FnA4<A, B, C, D, E> = Fn4<A, B, C, D, Promise<E>>;

export type FnA5<A, B, C, D, E, F> = Fn5<A, B, C, D, E, Promise<F>>;

export type FnA6<A, B, C, D, E, F, G> = Fn6<A, B, C, D, E, F, Promise<G>>;

export type FnA7<A, B, C, D, E, F, G, H> = Fn7<A, B, C, D, E, F, G, Promise<H>>;

export type FnA8<A, B, C, D, E, F, G, H, I> = Fn8<
	A,
	B,
	C,
	D,
	E,
	F,
	G,
	H,
	Promise<I>
>;

export type FnA9<A, B, C, D, E, F, G, H, I, J> = Fn9<
	A,
	B,
	C,
	D,
	E,
	F,
	G,
	H,
	I,
	Promise<J>
>;

export type FnA10<A, B, C, D, E, F, G, H, I, J, K> = Fn10<
	A,
	B,
	C,
	D,
	E,
	F,
	G,
	H,
	I,
	J,
	Promise<K>
>;

export type FnAnyA<T> = FnAny<Promise<T>>;

/**
 * Async version of {@link identity}.
 *
 * @param x
 */
export const asyncIdentity = async <T>(x: T) => x;
