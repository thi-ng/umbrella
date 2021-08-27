import type { DeepArrayValue } from "@thi.ng/api";
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
