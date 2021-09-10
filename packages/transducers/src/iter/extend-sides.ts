import { SEMAPHORE } from "@thi.ng/api/constants";
import { repeat } from "./repeat";

/**
 * Yields iterator of given iterable which repeats the first and/or last
 * value(s) `numLeft`/`numRight` times (default: 1).
 *
 * @remarks
 * By default both sides are repeated, but can be adjusted by setting
 * either of them to zero. `numRight` defaults to same value as
 * `numLeft`.
 *
 * @example
 * ```ts
 * [...extendSides([1, 2, 3])]
 * // [ 1,  1, 2, 3,  3]
 *
 * [...extendSides([1, 2, 3], 3)]
 * // [ 1, 1, 1,  1, 2, 3,  3, 3, 3 ]
 *
 * [...extendSides([1, 2, 3], 0, 3)]
 * // [ 1, 2, 3,  3, 3, 3 ]
 * ```
 *
 * - {@link padSides}
 * - {@link wrapSides}
 *
 * @param src -
 * @param numLeft -
 * @param numRight -
 */
export function* extendSides<T>(
    src: Iterable<T>,
    numLeft = 1,
    numRight = numLeft
): IterableIterator<T> {
    let prev: T | typeof SEMAPHORE = SEMAPHORE;
    for (let x of src) {
        if (numLeft > 0 && prev === SEMAPHORE) {
            yield* repeat(x, numLeft);
            numLeft = 0;
        }
        yield x;
        prev = x;
    }
    if (numRight > 0 && prev !== SEMAPHORE) {
        yield* repeat(prev, numRight);
    }
}
