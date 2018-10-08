export function* repeatedly<T>(fn: () => T, n = Infinity) {
    while (n-- > 0) {
        yield fn();
    }
}
