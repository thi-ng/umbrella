import type { Fn, NumOrString } from "@thi.ng/api";

/**
 * The most minimalistic & fastest memoization function of this package. Similar
 * to {@link memoize1}, but only supports numbers or strings as keys and uses a
 * vanilla JS object as cache.
 *
 * @remarks
 * Also see {@link memoize1}, {@link memoizeJ}, {@link memoize}.
 *
 * @example
 * ```ts tangle:../../export/memoizeo.ts
 * import { memoizeO } from "@thi.ng/memoize";
 *
 * const test = memoizeO((x: number) => (console.log("exec", x), x * 10));
 *
 * console.log(test(1));
 * // exec 1
 * // 10
 *
 * console.log(test(1))
 * // 10
 *
 * console.log(test(2));
 * // exec 2
 * // 20
 * ```
 *
 * @param fn
 * @param cache
 */
export const memoizeO =
	<A extends NumOrString, B>(
		fn: Fn<A, B>,
		cache: Record<NumOrString, B> = Object.create(null)
	) =>
	(x: A): B =>
		x in cache ? cache[x] : (cache[x] = fn(x));
