import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { iterator1 } from "../iterator";

/**
 * Transducer which only yields values with given `prob` probability
 * (0.0 .. 1.0 range).
 *
 * ```
 * // 10% probability
 * [...sample(0.1, range(100))]
 * // [ 3, 24, 25, 36, 43, 49, 59, 64, 82, 86, 89 ]
 * ```
 *
 * @param prob
 * @param src
 */
export function sample<T>(prob: number): Transducer<T, T>;
export function sample<T>(prob: number, src: Iterable<T>): IterableIterator<T>;
export function sample<T>(prob: number, src?: Iterable<T>): any {
    return src ?
        iterator1(sample(prob), src) :
        (rfn: Reducer<any, T>) => {
            const r = rfn[2];
            return compR(rfn,
                (acc, x: T) => Math.random() < prob ? r(acc, x) : acc);
        }
}
