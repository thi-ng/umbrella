import type { Nullable } from "@thi.ng/api";
import { identity } from "@thi.ng/api/fn";
import type { Transducer } from "./api.js";
import { mapcat } from "./mapcat.js";

/**
 * Transducer. Syntax sugar for `mapcat(x => x, ...)`, aka flattens/dissolves
 * 1st level of nesting in input. See {@link mapcat}.
 *
 * @example
 * ```ts tangle:../export/flatten1.ts
 * import { flatten1, mapcat } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...flatten1([[1], [2, 2], [3, 3, 3]])]
 * );
 * // [ 1, 2, 2, 3, 3, 3 ]
 *
 * // same as:
 * console.log(
 *   [...mapcat((x) => x, [[1], [2, 2], [3, 3, 3]])]
 * );
 * // [ 1, 2, 2, 3, 3, 3 ]
 *
 * // nullish inputs will be removed
 * console.log(
 *   [...flatten1([[1], null, [3, 3, 3]])]
 * );
 * // [1, 3, 3, 3]
 * ```
 */
export function flatten1<T>(): Transducer<Nullable<Iterable<T>>, T>;
export function flatten1<T>(
	src: Iterable<Nullable<Iterable<T>>>
): IterableIterator<T>;
export function flatten1<T>(src?: Iterable<Nullable<Iterable<T>>>): any {
	return mapcat(identity<any>, <any>src);
}
