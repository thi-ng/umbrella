import { peek as _peek } from "@thi.ng/arrays/peek";
import type { Transducer } from "./api.js";
import { map } from "./map.js";

/**
 * Transducer version of
 * [`peek()`](https://docs.thi.ng/umbrella/api/functions/peek.html), i.e.
 * extracts the last item of an array.
 *
 * @example
 * ```ts
 * [...peek([ [1, 2, 3], [4, 5] ])]
 * // [ 3, 5 ]
 * ```
 *
 * @param src -
 */
export function peek<T>(): Transducer<T[], T>;
export function peek<T>(src: Iterable<T[]>): IterableIterator<T>;
export function peek<T>(src?: Iterable<T[]>): any {
	return map(_peek, src!);
}
