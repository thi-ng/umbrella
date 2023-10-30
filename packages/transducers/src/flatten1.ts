import type { Nullable } from "@thi.ng/api";
import { identity } from "@thi.ng/api/fn";
import type { Transducer } from "./api.js";
import { mapcat } from "./mapcat.js";

/**
 * Transducer. Syntax sugar for `mapcat(x => x, ...)`, aka flattens/dissolves
 * 1st level of nesting in input. See {@link mapcat}.
 *
 * @example
 * ```
 * [...flatten1([[1], [2, 2], [3, 3, 3]])]
 * // [ 1, 2, 2, 3, 3, 3 ]
 *
 * // same as:
 * [...mapcat((x) => x, [[1], [2, 2], [3, 3, 3]])]
 * // [ 1, 2, 2, 3, 3, 3 ]
 *
 * // nullish inputs will be removed
 * [...flatten1([[1], null, [3, 3, 3]])]
 * // [1, 3, 3, 3]
 * ```
 *
 * @param src
 */
export function flatten1<T>(): Transducer<Nullable<Iterable<T>>, T>;
export function flatten1<T>(
	src: Iterable<Nullable<Iterable<T>>>
): IterableIterator<T>;
export function flatten1<T>(src?: Iterable<Nullable<Iterable<T>>>): any {
	return mapcat(identity<any>, <any>src);
}
