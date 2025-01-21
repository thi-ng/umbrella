// SPDX-License-Identifier: Apache-2.0
import type {
	Fn,
	MaybeAsyncIterable,
	MaybePromise,
	Nullable,
} from "@thi.ng/api";
import type { AsyncReducer, AsyncTransducer } from "./api.js";
import { compR } from "./compr.js";
import { iterator1 } from "./iterator.js";

export type Interceptor<T> = Fn<T, MaybePromise<Nullable<T>>>;

export interface AsyncInterceptor<T> extends AsyncTransducer<T, T> {
	/**
	 * Adds given interceptor function to the beginning of the list of interceptors.
	 *
	 * @param pred
	 */
	prepend(pred: Interceptor<T>): void;
	/**
	 * Adds given interceptor function to the end of the list of interceptors.
	 *
	 * @param pred
	 */
	append(pred: Interceptor<T>): void;
	/**
	 * Removes interceptor from list of interceptors and returns true if
	 * successful.
	 *
	 * @param pred
	 */
	remove(pred: Interceptor<T>): boolean;
}

/**
 * Async transducer. Applies a (dynamically changeable) list of interceptor
 * functions to augment/transform incoming values, or drop them entirely.
 *
 * @remarks
 * Interceptor functions are always applied in series to each received value.
 * Each interceptor can stop processing of a value by returning `null` or
 * `undefined`, otherwise the function is free to augment/transform the value
 * (but keeping its type) and the result is used as input for the next
 * interceptor, and eventually as result of the entire transducer function.
 *
 * If `intercept()` is called without source iterable and returns an transducer,
 * interceptor functions can be dynamically added or removed via the exposed
 * functions in {@link AsyncInterceptor}.
 *
 * @example
 * ```ts tangle:../export/intercept.ts
 * import { intercept, iterator } from "@thi.ng/transducers-async";
 *
 * // tag-based inference
 * const xform = intercept<string[]>([
 *   // add an "untitled" tag, if needed
 *   (tags) => !tags.find(x => /^title:/.test(x)) ? [...tags, "untitled"] : tags,
 * ]);
 *
 * // dynamically add a second interceptor to skip items if they're tagged with "temp"
 * // using .prepend() here to avoid extraneous processing
 * xform.prepend((tags) => tags.includes("temp") ? null : tags);
 *
 * const items = [
 *   ["photo1", "title:test"],
 *   ["photo2"],
 *   ["photo3", "temp"],
 * ];
 *
 * // process inputs and display results
 * for await(let tags of iterator(xform, items)) console.log(tags);
 * ```
 *
 * @param interceptors
 */
export function intercept<T>(
	interceptors?: Interceptor<T>[]
): AsyncInterceptor<T>;
export function intercept<T>(
	interceptors: Interceptor<T>[],
	src: MaybeAsyncIterable<T>
): AsyncIterableIterator<T>;
export function intercept<T>(
	interceptors: Interceptor<T>[] = [],
	src?: MaybeAsyncIterable<T>
) {
	if (src) return iterator1(intercept(interceptors), src);
	const xform = (rfn: AsyncReducer<T, any>) =>
		compR<T, T, any>(rfn, async (acc, x) => {
			for (let fn of interceptors) {
				const res = await fn(x);
				if (res == null) return acc;
				x = res;
			}
			return rfn[2](acc, x);
		});
	xform.prepend = (fn: Interceptor<T>) => {
		interceptors.unshift(fn);
	};
	xform.append = (fn: Interceptor<T>) => {
		interceptors.push(fn);
	};
	xform.remove = (fn: Interceptor<T>) => {
		const idx = interceptors.indexOf(fn);
		if (idx >= 0) {
			interceptors.splice(idx, 1);
			return true;
		}
		return false;
	};
	return xform;
}
