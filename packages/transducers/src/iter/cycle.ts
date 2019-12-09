/**
 * Iterator which yields an infinite repetition of given `input`
 * iterable's values. Produces no values if `input` is empty.
 *
 * @example
 * ```ts
 * [...take(5, cycle([1, 2, 3]))]
 * // [1, 2, 3, 1, 2]
 * ```
 *
 * @param input -
 */
export function* cycle<T>(input: Iterable<T>) {
    let cache: T[] = [];
    for (let i of input) {
        cache.push(i);
        yield i;
    }
    if (cache.length > 0) {
        while (true) {
            yield* cache;
        }
    }
}
