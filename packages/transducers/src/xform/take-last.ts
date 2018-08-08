import { Reducer, Transducer } from "../api";
import { iterator } from "../iterator";
import { isReduced } from "../reduced";

/**
 * Transducer which only yields the last `n` values. Assumes
 * input source is finite (of course).
 *
 * ```
 * [...takeLast(3, range(10))]
 * // [ 7, 8, 9 ]
 * ```
 *
 * @param n
 * @param src
 */
export function takeLast<T>(n: number): Transducer<T, T>;
export function takeLast<T>(n: number, src: Iterable<T>): IterableIterator<T>;
export function takeLast<T>(n: number, src?: Iterable<T>): any {
    return src ?
        iterator(takeLast(n), src) :
        ([init, complete, reduce]: Reducer<any, T>) => {
            const buf: T[] = [];
            return [
                init,
                (acc) => {
                    while (buf.length && !isReduced(acc)) {
                        acc = reduce(acc, buf.shift());
                    }
                    return complete(acc);
                },
                (acc, x) => {
                    if (buf.length === n) {
                        buf.shift();
                    }
                    buf.push(x);
                    return acc;
                }
            ];
        }
}
