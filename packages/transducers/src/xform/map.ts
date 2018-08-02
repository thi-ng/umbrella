import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

/**
 * Transducer. Applies mapping function `fn` to each received value and
 * passes result downstream to next reducer.
 *
 * ```
 * [...iterator(map((x) => x * 10), [1, 2, 3])]
 * // [ 10, 20, 30 ]
 * ```
 *
 * @param fn transformation function
 */
export function map<A, B>(fn: (x: A) => B): Transducer<A, B> {
    return (rfn: Reducer<any, B>) => {
        const r = rfn[2];
        return compR(rfn, (acc, x: A) => r(acc, fn(x)));
    };
}
