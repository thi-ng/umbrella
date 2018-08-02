import { Transducer } from "../api";
import { throttle } from "./throttle";

/**
 * Transducer which only yields every `n`-th value from the input
 * source.
 *
 * ```
 * [...iterator(takeNth(3), range(10))]
 * // [ 0, 3, 6, 9 ]
 * ```
 *
 * @param n
 */
export function takeNth<T>(n: number): Transducer<T, T> {
    n = Math.max(0, n - 1);
    return throttle(
        () => {
            let skip = 0;
            return () => (skip === 0 ? (skip = n, true) : (skip-- , false));
        }
    );
}
