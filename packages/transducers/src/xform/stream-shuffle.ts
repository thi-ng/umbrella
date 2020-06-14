import { shuffle } from "@thi.ng/arrays";
import { $iter, iterator } from "../iterator";
import { isReduced } from "../reduced";
import type { Reducer, Transducer } from "../api";

/**
 * Transducer. Creates internal sliding window of `n` values and
 * performs `maxSwaps` random shuffle operations for each new value and
 * yields values in shuffled order. By default `maxSwaps` is the same as
 * the chosen chunk size.
 *
 * @example
 * ```ts
 * [...streamShuffle(5, range(10))]
 * // [ 3, 2, 5, 0, 8, 7, 1, 6, 4, 9 ]
 * ```
 *
 * @param n - sliding window size
 * @param maxSwaps - number of swaps per input
 */
export function streamShuffle<T>(
    n: number,
    maxSwaps?: number
): Transducer<T, T>;
export function streamShuffle<T>(
    n: number,
    src: Iterable<T>
): IterableIterator<T>;
export function streamShuffle<T>(
    n: number,
    maxSwaps: number,
    src: Iterable<T>
): IterableIterator<T>;
export function streamShuffle<T>(...args: any[]): any {
    return (
        $iter(streamShuffle, args, iterator) ||
        (([init, complete, reduce]: Reducer<any, T>) => {
            const n: number = args[0];
            const maxSwaps: number = args[1] || n;
            const buf: T[] = [];
            return <Reducer<any, T>>[
                init,
                (acc) => {
                    while (buf.length && !isReduced(acc)) {
                        shuffle(buf, maxSwaps);
                        acc = reduce(acc, buf.shift()!);
                    }
                    acc = complete(acc);
                    return acc;
                },
                (acc, x: T) => {
                    buf.push(x);
                    shuffle(buf, maxSwaps);
                    if (buf.length === n) {
                        acc = reduce(acc, buf.shift()!);
                    }
                    return acc;
                },
            ];
        })
    );
}
