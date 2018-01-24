export default function* repeat<T>(x: T, n = Number.POSITIVE_INFINITY) {
    while (n-- > 0) {
        yield x;
    }
}
