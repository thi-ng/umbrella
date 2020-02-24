import type { Fn0 } from "@thi.ng/api";

/**
 * Iterator yielding return values of given no-arg function `fn`. If `n`
 * is given, only that many values will be produced, else the iterator
 * is infinite.
 *
 * @example
 * ```ts
 * [...repeatedly(() => Math.floor(Math.random() * 10), 5)]
 * // [7, 0, 9, 3, 1]
 * ```
 *
 * @param fn - value producer
 * @param n - num values (default: ∞)
 */
export function* repeatedly<T>(fn: Fn0<T>, n = Infinity) {
    while (n-- > 0) {
        yield fn();
    }
}
