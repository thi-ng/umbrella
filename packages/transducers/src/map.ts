import type { Fn } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { iterator1 } from "./iterator.js";

/**
 * Transducer. Applies mapping function `fn` to each received value and
 * passes result downstream to next reducer.
 *
 * @example
 * ```ts
 * import { map } from "@thi.ng/transducers";
 *
 * [...map((x) => x * 10, [1, 2, 3])]
 * // [ 10, 20, 30 ]
 * ```
 *
 * @param fn - transformation function
 */
export function map<A, B>(fn: Fn<A, B>): Transducer<A, B>;
export function map<A, B>(fn: Fn<A, B>, src: Iterable<A>): IterableIterator<B>;
export function map<A, B>(fn: Fn<A, B>, src?: Iterable<A>): any {
	return isIterable(src)
		? iterator1(map(fn), src)
		: (rfn: Reducer<any, B>) => {
				const r = rfn[2];
				return compR(rfn, (acc, x: A) => r(acc, fn(x)));
		  };
}

/**
 * Convenience wrapper for {@link map} to transform an iterable with given `fn`
 * and immediatedly collect results into an array.
 */
export const mapA = <A, B>(fn: Fn<A, B>, src: Iterable<A>): B[] => [
	...map(fn, src),
];
