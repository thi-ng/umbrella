export function* repeat<T>(x: T, n = Infinity): IterableIterator<T> {
    while (n-- > 0) {
        yield x;
    }
}
