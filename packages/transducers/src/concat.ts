import type { Nullable } from "@thi.ng/api";
import { ensureIterable } from "@thi.ng/arrays/ensure-iterable";

/**
 * Yields iterator producing concatenation of given iterables.
 * Undefined & null inputs are silently ignored, however any
 * such values produced or contained in an input will remain.
 *
 * @example
 * ```ts tangle:../export/concat.ts
 * import { concat } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...concat([1, 2, 3], null, [4, 5])]
 * );
 * // [ 1, 2, 3, 4, 5 ]
 *
 * console.log(
 *   [...concat([1, 2, 3, undefined], null, [4, 5])]
 * );
 * // [ 1, 2, 3, undefined, 4, 5 ]
 * ```
 *
 * @param sources -
 */
export function* concat<T>(
	...sources: Nullable<Iterable<T>>[]
): IterableIterator<T> {
	for (let src of sources) {
		src != null && (yield* ensureIterable(src));
	}
}
