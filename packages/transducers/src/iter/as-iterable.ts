/**
 * Helper function / generator to (re)provide given iterable in iterator
 * form.
 *
 * @param src -
 */
export function* asIterable<T>(src: Iterable<T>) {
    yield* src;
}
