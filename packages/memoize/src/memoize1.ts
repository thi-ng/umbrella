import type { Fn } from "@thi.ng/api";
import type { MapLike } from "./api.js";

/**
 * Optimized memoization for single arg functions. If the function
 * expects args other than strings or numbers, you MUST provide a `Map`
 * implementation which supports value (rather than object) equality,
 * e.g. one of those provided by
 * {@link @thi.ng/associative# | @thi.ng/associative}. Using a native
 * `Map` type here will lead to memory leaks! Alternatively, use
 * {@link (memoizeJ:1)}.
 *
 * @param fn -
 * @param cache -
 */
export const memoize1 = <A, B>(fn: Fn<A, B>, cache?: MapLike<A, B>) => {
	!cache && (cache = new Map());
	return (x: A): B => {
		let res;
		return cache!.has(x)
			? cache!.get(x)!
			: (cache!.set(x, (res = fn(x))), res);
	};
};
