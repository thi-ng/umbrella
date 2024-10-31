import type {
	Fn,
	Fn2,
	Fn3,
	Fn4,
	IObjectOf,
	MaybePromise,
	NumOrString,
} from "@thi.ng/api";

/**
 * The most minimalistic memoization function of this package, but only supports
 * numbers or strings as arguments (max. 4) and uses a vanilla JS object as
 * cache.
 *
 * @remarks
 * If `fn` throws an error, no result value will be cached and no memoization
 * happens for this invocation using the given arguments.
 *
 * Use {@link memoizeAsyncO} for async functions or other functions returning
 * promises.
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
export function memoizeO<A extends NumOrString, B>(
	fn: Fn<A, B>,
	cache?: IObjectOf<B>
): Fn<A, B>;
export function memoizeO<A extends NumOrString, B extends NumOrString, C>(
	fn: Fn2<A, B, C>,
	cache?: IObjectOf<C>
): Fn2<A, B, C>;
export function memoizeO<
	A extends NumOrString,
	B extends NumOrString,
	C extends NumOrString,
	D
>(fn: Fn3<A, B, C, D>, cache?: IObjectOf<D>): Fn3<A, B, C, D>;
export function memoizeO<
	A extends NumOrString,
	B extends NumOrString,
	C extends NumOrString,
	D extends NumOrString,
	E
>(fn: Fn4<A, B, C, D, E>, cache?: IObjectOf<E>): Fn4<A, B, C, D, E>;
export function memoizeO<T extends (...xs: NumOrString[]) => any>(
	fn: T,
	cache: IObjectOf<ReturnType<T>> = Object.create(null)
): T {
	// @ts-ignore
	return (...xs: any[]) => {
		const key = xs.join("-");
		return key in cache ? cache[key] : (cache[key] = fn(...xs));
	};
}

/**
 * Async version of {@link memoizeO}.
 *
 * @remarks
 * If `fn` throws an error, no result value will be cached and no memoization
 * happens for this invocation using the given arguments.
 *
 * @param fn
 * @param cache
 */
export function memoizeAsyncO<A extends NumOrString, B>(
	fn: Fn<A, MaybePromise<B>>,
	cache?: IObjectOf<B>
): Fn<A, Promise<B>>;
export function memoizeAsyncO<A extends NumOrString, B extends NumOrString, C>(
	fn: Fn2<A, B, MaybePromise<C>>,
	cache?: IObjectOf<C>
): Fn2<A, B, Promise<C>>;
export function memoizeAsyncO<
	A extends NumOrString,
	B extends NumOrString,
	C extends NumOrString,
	D
>(
	fn: Fn3<A, B, C, MaybePromise<D>>,
	cache?: IObjectOf<D>
): Fn3<A, B, C, Promise<D>>;
export function memoizeAsyncO<
	A extends NumOrString,
	B extends NumOrString,
	C extends NumOrString,
	D extends NumOrString,
	E
>(
	fn: Fn4<A, B, C, D, MaybePromise<E>>,
	cache?: IObjectOf<E>
): Fn4<A, B, C, D, Promise<E>>;
export function memoizeAsyncO<T extends (...xs: NumOrString[]) => any>(
	fn: T,
	cache: IObjectOf<ReturnType<T>> = Object.create(null)
): T {
	// @ts-ignore
	return async (...xs: any[]) => {
		const key = xs.join("-");
		return key in cache ? cache[key] : (cache[key] = await fn(...xs));
	};
}
