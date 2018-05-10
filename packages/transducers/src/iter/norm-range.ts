/**
 * Yields sequence of `n+1` monotonically increasing numbers in the
 * closed interval (0.0 .. 1.0). If `n <= 0`, yields nothing.
 *
 * ```
 * [...normRange(4)]
 * // [0, 0.25, 0.5, 0.75, 1.0]
 * ```
 *
 * @param n number of steps
 */
export function* normRange(n: number) {
    if (n > 0) {
        for (let i = 0; i <= n; i++) {
            yield i / n;
        }
    }
}
