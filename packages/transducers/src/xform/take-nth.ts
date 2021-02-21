import { isIterable } from "@thi.ng/checks";
import { clamp0 } from "@thi.ng/math";
import type { Transducer } from "../api";
import { iterator1 } from "../iterator";
import { throttle } from "./throttle";

/**
 * Transducer which only yields every `n`-th value from the input
 * source.
 *
 * @example
 * ```ts
 * [...takeNth(3, range(10))]
 * // [ 0, 3, 6, 9 ]
 * ```
 *
 * @param n -
 */
export function takeNth<T>(n: number): Transducer<T, T>;
export function takeNth<T>(n: number, src: Iterable<T>): IterableIterator<T>;
export function takeNth<T>(n: number, src?: Iterable<T>): any {
    if (isIterable(src)) {
        return iterator1(takeNth(n), src);
    }
    n = clamp0(n - 1);
    return throttle(() => {
        let skip = 0;
        return () => (skip === 0 ? ((skip = n), true) : (skip--, false));
    });
}
