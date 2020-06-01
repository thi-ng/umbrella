import { isNotStringAndIterable } from "@thi.ng/checks";
import type { Transducer } from "../api";
import { flattenWith } from "./flatten-with";

/**
 * Transducer. Recursively flattens input iff it is iterable and NOT a
 * string.
 *
 * @remarks
 * Syntax sugar for {@link flattenWith}. If `src` is given, yields
 * iterator of results.
 *
 * @example
 * ```ts
 * [...flatten([[1, [2, 3]], ["abc", "cde"]])]
 * // [1, 2, 3, "abc", "def"]
 *
 * [...flatten("abc")]
 * // [ 'abc' ]
 * ```
 *
 * @param src -
 */
export function flatten<T>(): Transducer<T | Iterable<T>, T>;
export function flatten<T>(src: Iterable<T | Iterable<T>>): IterableIterator<T>;
export function flatten<T>(src?: Iterable<T | Iterable<T>>): any {
    return flattenWith(
        (x) => (isNotStringAndIterable(x) ? x : undefined),
        src!
    );
}
