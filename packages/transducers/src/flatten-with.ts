import type { DeepArrayValue, Fn, Nullable } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isString } from "@thi.ng/checks/is-string";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { iterator } from "./iterator.js";
import { isReduced } from "./reduced.js";

export type MaybeIterable<T> = Nullable<Iterable<T>>;

/**
 * Transducer. Takes a function `fn` which will be applied to each input
 * value. If the function returns an ES6 Iterable, the result will be
 * recursively flattened (via same user provided fn). If the function
 * returns null/undefined, the original input value will be used as
 * result.
 *
 * @remarks
 * Also see {@link flatten}. If `src` is given as well, yields iterator
 * of results.
 *
 * @example
 * ```ts
 * import { flattenWith } from "@thi.ng/transducers";
 *
 * // custom predicate which converts objects into key/val tuples,
 * // returns iterables as is and null for everything else
 * const pred = (x) =>
 *   isPlainObject(x)
 *     ? pairs(x)
 *     : isNotStringAndIterable(x)
 *       ? x
 *       : null;
 *
 * [...flattenWith(pred, [{ a: 1, b: 2 }, [[{ c: 3 }]]])]
 * // [ 'a', 1, 'b', 2, 'c', 3 ]
 * ```
 *
 * @param fn -
 */
export function flattenWith<A, B = DeepArrayValue<A>>(
	fn: Fn<any, MaybeIterable<any>>
): Transducer<A, B>;
export function flattenWith<A, B = DeepArrayValue<A>>(
	fn: Fn<any, MaybeIterable<any>>,
	src: Iterable<A>
): IterableIterator<B>;
export function flattenWith<A>(
	fn: Fn<any, MaybeIterable<any>>,
	src?: Iterable<A>
): any {
	return isIterable(src)
		? iterator(flattenWith(fn), isString(src) ? <any>[src] : src)
		: (rfn: Reducer<any, A>) => {
				const reduce = rfn[2];
				const flatten = (acc: any, x: any) => {
					const xx = fn(x);
					if (xx) {
						for (let y of xx) {
							acc = flatten(acc, y);
							if (isReduced(acc)) {
								break;
							}
						}
						return acc;
					}
					return reduce(acc, x);
				};
				return compR(rfn, flatten);
		  };
}
