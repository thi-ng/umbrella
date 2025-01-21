// SPDX-License-Identifier: Apache-2.0
import type { FnAny, IObjectOf } from "@thi.ng/api";

/**
 * Function memoization for arbitrary argument counts. Returns augmented
 * function, which uses `JSON.stringify()` to obtain (and store)
 * memoized result for given args. Supports generics for up to 4 args
 * (otherwise untyped).
 *
 * @remarks
 * **Important:** If the given args cannot be stringified, the user
 * function will ALWAYS be called (without caching result).
 *
 * Also see {@link memoize}, {@link memoize1}, {@link memoizeO}.
 *
 * @param fn -
 * @param cache -
 */
export function memoizeJ<T extends FnAny<any>>(
	fn: T,
	cache: IObjectOf<any> = Object.create(null)
): T {
	// @ts-ignore
	return (...args: any[]) => {
		const key = JSON.stringify(args);
		if (key !== undefined) {
			return key in cache
				? cache[key]
				: (cache[key] = fn.apply(null, args));
		}
		return fn.apply(null, args);
	};
}

/**
 * Async version of {@link memoizeJ}.
 *
 * @param fn
 * @param cache
 */
export function memoizeAsyncJ<T extends FnAny<any>>(
	fn: T,
	cache: IObjectOf<any> = Object.create(null)
): (...xs: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
	// @ts-ignore
	return async (...args: any[]) => {
		const key = JSON.stringify(args);
		if (key !== undefined) {
			return key in cache
				? cache[key]
				: (cache[key] = await fn.apply(null, args));
		}
		return await fn.apply(null, args);
	};
}
