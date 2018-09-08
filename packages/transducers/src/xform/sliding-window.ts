import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { $iter } from "../iterator";

/**
 * Sliding window transducer, similar to `partition(size, 1)`, but
 * supports initially partially filled windows, if `partial` is set to
 * true (default). Each emitted window is a shallow copy of the internal
 * accumulation buffer.
 *
 * ```
 * [...window(3, range(5))]
 * // [ [ 0 ], [ 0, 1 ], [ 0, 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ] ]
 *
 * [...window(3, false, range(5))]
 * // [ [ 0, 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ] ]
 * ```
 *
 * @param size
 * @param partial
 * @param src
 */
export function slidingWindow<T>(size: number, partial?: boolean): Transducer<T, T[]>;
export function slidingWindow<T>(size: number, src: Iterable<T>): IterableIterator<T[]>;
export function slidingWindow<T>(size: number, partial: boolean, src: Iterable<T>): IterableIterator<T[]>;
export function slidingWindow<T>(...args: any[]): any {
    const iter = $iter(slidingWindow, args);
    if (iter) {
        return iter;
    }
    const size: number = args[0];
    const partial: boolean = args[1] !== false;
    return (rfn: Reducer<any, T[]>) => {
        const reduce = rfn[2];
        let buf: T[] = [];
        return compR(rfn,
            (acc, x: T) => {
                buf.push(x);
                if (partial || buf.length === size) {
                    acc = reduce(acc, buf);
                    buf = buf.slice(buf.length === size ? 1 : 0);
                }
                return acc;
            });
    };
}