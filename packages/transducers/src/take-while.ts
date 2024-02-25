import type { Predicate } from "@thi.ng/api";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { __iter } from "./iterator.js";
import { reduced } from "./reduced.js";

/**
 * Transducer which applies predicate `pred` to each input and only
 * yields values as long as the predicate returned a truthy result. Once
 * the result is falsy, transformation is terminated (by emitting a
 * {@link reduced} value).
 *
 * @example
 * ```ts
 * import { range, takeWhile } from "@thi.ng/transducers";
 *
 * [...takeWhile((x) => x < 5, range(10))]
 * // [ 0, 1, 2, 3, 4 ]
 * ```
 *
 * @param pred -
 * @param src -
 */
export function takeWhile<T>(pred?: Predicate<T>): Transducer<T, T>;
export function takeWhile<T>(src: Iterable<T>): IterableIterator<T>;
export function takeWhile<T>(
	pred: Predicate<T>,
	src: Iterable<T>
): IterableIterator<T>;
export function takeWhile<T>(...args: any[]): any {
	return (
		__iter(takeWhile, args) ||
		((rfn: Reducer<any, T>) => {
			const r = rfn[2];
			const pred = args[0];
			let ok = true;
			return compR(rfn, (acc, x: T) =>
				(ok = ok && pred(x)) ? r(acc, x) : reduced(acc)
			);
		})
	);
}
