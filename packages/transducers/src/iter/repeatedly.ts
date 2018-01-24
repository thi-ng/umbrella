export function* repeatedly<T>(fn: () => T, n = Number.POSITIVE_INFINITY) {
    while (n-- > 0) {
        yield fn();
    }
}
