import { peek as _peek } from "@thi.ng/arrays/peek";
import type { Transducer } from "./api";
import { map } from "./map";

/**
 * Transducer version of {@link @thi.ng/api#peek}, i.e. extracts the
 * last item of an array.
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
