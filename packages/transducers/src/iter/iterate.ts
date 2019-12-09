import { Fn2 } from "@thi.ng/api";

/**
 * Yields an infinite iterator of the inductive sequence:
 *
 * `f(x+1) = f(f(x))`
 *
 * @remarks
 * The first value emitted always is `seed` itself, then f(seed),
 * f(f(seed)) etc. The given function is called with the current
 * iteration counter as 2nd arg.
 *
 * @example
 * ```ts
 * [...take(5, iterate((x) => x * 2, 1))]
 * // [ 1, 2, 4, 8, 16 ]
 *
 * [...take(8, iterate((x, i) => x * 10 + i, 0))]
 * // [ 0, 1, 12, 123, 1234, 12345, 123456, 1234567 ]
 * ```
 *
 * @param fn -
 * @param seed -
 */
export function* iterate<T>(
    fn: Fn2<T, number, T>,
    seed: T
): IterableIterator<T> {
    let i = 0;
    while (true) {
        yield seed;
        seed = fn(seed, ++i);
    }
}
