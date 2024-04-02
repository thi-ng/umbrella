import type { Fn, Fn0, Fn2 } from "./fn.js";

export type MaybePromise<T> = T | Promise<T>;

export type MaybeAsyncIterable<T> = Iterable<T> | AsyncIterable<T>;

export type MaybeAsyncGenerator<T> =
	| IterableIterator<T>
	| AsyncIterableIterator<T>;

export type AsyncPredicate<T> = Fn<T, Promise<boolean>>;

export type AsyncPredicate2<T> = Fn2<T, T, Promise<boolean>>;

export type AsyncStatefulPredicate<T> = Fn0<AsyncPredicate<T>>;

export type AsyncStatefulPredicate2<T> = Fn0<AsyncPredicate2<T>>;

/**
 * Async version of {@link identity}.
 *
 * @param x
 */
export const asyncIdentity = async <T>(x: T) => x;
