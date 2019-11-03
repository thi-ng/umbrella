import { SEMAPHORE } from "@thi.ng/api";
import { repeat } from "./repeat";

/**
 * Yields iterator of given iterable which repeats the first and/or last
 * value(s) `n` times (default: 1). By default both sides are repeated,
 * but can be adjusted via `left` / `right` flags.
 *
 * ```
 * [...extendSides([1, 2, 3])]
 * // [ 1,  1, 2, 3,  3]
 *
 * [...extendSides([1, 2, 3], 3)]
 * // [ 1, 1, 1,  1, 2, 3,  3, 3, 3 ]
 *
 * [...extendSides([1, 2, 3], 3, false, true)]
 * // [ 1, 2, 3, 3, 3, 3 ]
 * ```
 *
 * @see padSides
 * @see wrap
 *
 * @param src
 * @param n
 * @param left
 * @param right
 */
export function* extendSides<T>(
    src: Iterable<T>,
    n = 1,
    left = true,
    right = true
) {
    let prev: T | typeof SEMAPHORE = SEMAPHORE;
    for (let x of src) {
        if (left && prev === SEMAPHORE) {
            yield* repeat(x, n);
            left = false;
        }
        yield x;
        prev = x;
    }
    if (right && prev !== SEMAPHORE) {
        yield* repeat(prev, n);
    }
}
