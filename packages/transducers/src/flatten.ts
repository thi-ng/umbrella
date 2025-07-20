// SPDX-License-Identifier: Apache-2.0
import type { DeepArrayValue } from "@thi.ng/api";
import { isNotStringAndIterable } from "@thi.ng/checks/is-not-string-iterable";
import type { Transducer } from "./api.js";
import { flattenWith } from "./flatten-with.js";

/**
 * Transducer. Recursively flattens input iff it is iterable and NOT a
 * string.
 *
 * @remarks
 * Syntax sugar for {@link flattenWith}. If `src` is given, yields
 * iterator of results.
 *
 * @example
 * ```ts tangle:../export/flatten.ts
 * import { flatten } from "@thi.ng/transducers";
 *
 * console.log(
 *   [...flatten([[1, [2, 3]], ["abc", "def"]])]
 * );
 * // [1, 2, 3, "abc", "def"]
 *
 * console.log(
 *   [...flatten("abc")]
 * );
 * // [ 'abc' ]
 * ```
 */
export function flatten<A, B = DeepArrayValue<A>>(): Transducer<A, B>;
export function flatten<A, B = DeepArrayValue<A>>(
	src: Iterable<A>
): IterableIterator<B>;
export function flatten(src?: Iterable<any>): any {
	return flattenWith<any, any>(
		(x) => (isNotStringAndIterable(x) ? x : undefined),
		src!
	);
}
