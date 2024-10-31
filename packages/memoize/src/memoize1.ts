import type { Fn, MaybePromise } from "@thi.ng/api";
import type { MapLike } from "./api.js";

/**
 * Optimized memoization for single arg functions.
 *
 * @remarks
 * If the function expects args other than strings or numbers, you MUST provide
 * a `Map` implementation which supports value (rather than object) equality,
 * e.g. one of those provided by
 * [`thi.ng/associative`](https://thi.ng/associative). Using a native `Map` type
 * here will lead to memory leaks!
 *
 * Also see {@link memoizeO}, {@link memoizeJ}, {@link memoize}.
 *
 * @param fn -
 * @param cache -
 */
export const memoize1 =
	<A, B>(fn: Fn<A, B>, cache: MapLike<A, B> = new Map()) =>
	(x: A): B => {
		let res;
		return cache.has(x)
			? cache.get(x)!
			: (cache.set(x, (res = fn(x))), res);
	};

/**
 * Async version of {@link memoize1}.
 *
 * @param fn
 * @param cache
 */
export const memoizeAsync1 =
	<A, B>(fn: Fn<A, MaybePromise<B>>, cache: MapLike<A, B> = new Map()) =>
	async (x: A): Promise<B> => {
		let res;
		return cache.has(x)
			? cache.get(x)!
			: (cache.set(x, (res = await fn(x))), res);
	};
