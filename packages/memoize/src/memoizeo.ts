import type { Fn, Fn2, Fn3, Fn4, NumOrString } from "@thi.ng/api";

/**
 * The most minimalistic & fastest memoization function of this package. Similar
 * to {@link memoize1}, but only supports numbers or strings as keys and uses a
 * vanilla JS object as cache.
 *
 * @remarks
 * Also see {@link memoize1}, {@link memoizeJ}, {@link memoize}.
 *
 * @example
 * ```ts tangle:../export/memoizeo.ts
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

/**
 * Like {@link memoizeO}, but for functions with 2 arguments.
 *
 * @param fn
 * @param cache
 */
export const memoize2O =
	<A extends NumOrString, B extends NumOrString, C>(
		fn: Fn2<A, B, C>,
		cache: Record<string, C> = Object.create(null)
	) =>
	(a: A, b: B): C => {
		const key = a + "-" + b;
		return key in cache ? cache[key] : (cache[key] = fn(a, b));
	};

/**
 * Like {@link memoizeO}, but for functions with 3 arguments.
 *
 * @param fn
 * @param cache
 */
export const memoize3O =
	<A extends NumOrString, B extends NumOrString, C extends NumOrString, D>(
		fn: Fn3<A, B, C, D>,
		cache: Record<string, D> = Object.create(null)
	) =>
	(a: A, b: B, c: C): D => {
		const key = a + "-" + b + "-" + c;
		return key in cache ? cache[key] : (cache[key] = fn(a, b, c));
	};

/**
 * Like {@link memoizeO}, but for functions with 4 arguments.
 *
 * @param fn
 * @param cache
 */
export const memoize4O =
	<
		A extends NumOrString,
		B extends NumOrString,
		C extends NumOrString,
		D extends NumOrString,
		E
	>(
		fn: Fn4<A, B, C, D, E>,
		cache: Record<string, E> = Object.create(null)
	) =>
	(a: A, b: B, c: C, d: D): E => {
		const key = a + "-" + b + "-" + c + "-" + d;
		return key in cache ? cache[key] : (cache[key] = fn(a, b, c, d));
	};
