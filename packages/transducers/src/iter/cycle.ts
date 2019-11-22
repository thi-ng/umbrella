export function* cycle<T>(input: Iterable<T>): IterableIterator<T> {
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
