export function zip<A>(a: Iterable<A>): IterableIterator<[A]>;
export function zip<A, B>(
    a: Iterable<A>,
    b: Iterable<B>
): IterableIterator<[A, B]>;
export function zip<A, B, C>(
    a: Iterable<A>,
    b: Iterable<B>,
    c: Iterable<C>
): IterableIterator<[A, B, C]>;
export function zip<A, B, C, D>(
    a: Iterable<A>,
    b: Iterable<B>,
    c: Iterable<C>,
    d: Iterable<D>
): IterableIterator<[A, B, C, D]>;
export function zip<A, B, C, D, E>(
    a: Iterable<A>,
    b: Iterable<B>,
    c: Iterable<C>,
    d: Iterable<D>,
    e: Iterable<E>
): IterableIterator<[A, B, C, D, E]>;
export function zip<A, B, C, D, E, F>(
    a: Iterable<A>,
    b: Iterable<B>,
    c: Iterable<C>,
    d: Iterable<D>,
    e: Iterable<E>,
    f: Iterable<F>
): IterableIterator<[A, B, C, D, E, F]>;
export function zip<A, B, C, D, E, F, G>(
    a: Iterable<A>,
    b: Iterable<B>,
    c: Iterable<C>,
    d: Iterable<D>,
    e: Iterable<E>,
    f: Iterable<F>,
    g: Iterable<G>
): IterableIterator<[A, B, C, D, E, F, G]>;
export function zip<A, B, C, D, E, F, G, H>(
    a: Iterable<A>,
    b: Iterable<B>,
    c: Iterable<C>,
    d: Iterable<D>,
    e: Iterable<E>,
    f: Iterable<F>,
    g: Iterable<G>,
    h: Iterable<H>
): IterableIterator<[A, B, C, D, E, F, G, H]>;
export function* zip(...src: Iterable<any>[]): IterableIterator<any[]> {
    const iters = src.map((s) => s[Symbol.iterator]());
    while (true) {
        const tuple = [];
        for (let i of iters) {
            let v = i.next();
            if (v.done) {
                return;
            }
            tuple.push(v.value);
        }
        yield tuple;
    }
}

/**
 * Yields a tuple of elements, where the i-th tuple contains the i-th  element from each of the input argument sequences or iterables.
 * Such as the first tuple contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
 * 
 * The returned list is truncated in length to the length of the shortest argument sequence. With a single sequence argument, it yields a list of 1-tuples.
 * 
 * ```
 * tx.zip([1,2,3], [3,4,5])
 * // [ 1, 3 ] [ 2, 4 ] [ 3, 5 ]
 * 
 * tx.zip([1,2,3])
 * // [ 1 ] [ 2 ] [ 3 ]
 * 
 * tx.zip([1,2,3], [3,4,5, 0, 9])
 * // [ 1, 3 ] [ 2, 4 ] [ 3, 5 ]
 * ```
 *
 * @deprecated renamed to `zip`
 **/
export const tuples = zip;
