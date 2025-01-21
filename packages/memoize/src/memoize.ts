// SPDX-License-Identifier: Apache-2.0
import type { FnAny } from "@thi.ng/api";
import type { MapLike } from "./api.js";

/**
 * Function memoization for arbitrary argument counts. Returns augmented
 * function, which uses the given `Map` implementation to obtain and store
 * memoized result of given args. Supports generics for up to 4 args (otherwise
 * untyped).
 *
 * @remarks
 * **Important:** It only makes sense to use `Map` types which support value
 * (rather than object) equality, e.g. those provided by
 * [`thi.ng/associative`](https://thi.ng/associative). Using a native `Map` type
 * here will lead to memory leaks!
 *
 * Also see {@link memoizeJ}, {@link memoize1}, {@link memoizeO}.
 *
 * @param fn -
 * @param cache -
 */
export function memoize<T extends FnAny<any>>(
	fn: T,
	cache: MapLike<any, any>
): T {
	// @ts-ignore
	return (...args: any[]) => {
		let res;
		return cache.has(args)
			? cache.get(args)
			: (cache.set(args, (res = fn.apply(null, args))), res);
	};
}

/**
 * Async version of {@link memoize}.
 *
 * @param fn
 * @param cache
 */
export function memoizeAsync<T extends FnAny<any>>(
	fn: T,
	cache: MapLike<any, any>
): (...xs: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
	// @ts-ignore
	return async (...args: any[]) => {
		let res;
		return cache.has(args)
			? cache.get(args)
			: (cache.set(args, (res = await fn.apply(null, args))), res);
	};
}
