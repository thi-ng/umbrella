import type { Fn, Fn2, Fn3, Fn4, FnAny } from "@thi.ng/api";
import type { MapLike } from "./api.js";

/**
 * Function memoization for arbitrary argument counts. Returns augmented
 * function, which uses the given `Map` implementation to obtain and store
 * memoized result of given args. Supports generics for up to 4 args (otherwise
 * untyped).
 *
 * **Important:** It only makes sense to use `Map` types which support value
 * (rather than object) equality, e.g. those provided by
 * [`thi.ng/associative`](https://thi.ng/associative). Using a native `Map` type
 * here will lead to memory leaks! Alternatively, use {@link memoizeJ}.
 *
 * @param fn -
 * @param cache -
 */
export function memoize<A, B>(fn: Fn<A, B>, cache: MapLike<A, B>): Fn<A, B>;
export function memoize<A, B, C>(
	fn: Fn2<A, B, C>,
	cache: MapLike<[A, B], C>
): Fn2<A, B, C>;
export function memoize<A, B, C, D>(
	fn: Fn3<A, B, C, D>,
	cache: MapLike<[A, B, C], D>
): Fn3<A, B, C, D>;
export function memoize<A, B, C, D, E>(
	fn: Fn4<A, B, C, D, E>,
	cache: MapLike<[A, B, C, D], E>
): Fn4<A, B, C, D, E>;
export function memoize(fn: FnAny<any>, cache: MapLike<any, any>): FnAny<any> {
	return (...args: any[]) => {
		let res;
		return cache.has(args)
			? cache.get(args)
			: (cache.set(args, (res = fn.apply(null, args))), res);
	};
}
