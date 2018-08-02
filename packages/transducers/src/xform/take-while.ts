import { Predicate } from "@thi.ng/api/api";

import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { reduced } from "../reduced";

/**
 * Transducer which applies predicate `pred` to each input and only
 * yields values as long as the predicate returned a truthy result. Once
 * the result is falsy, transformation is terminated (by emitting a
 * `reduced()` value).
 *
 * ```
 * [...iterator(takeWhile((x) => x < 5), range(10))]
 * // [ 0, 1, 2, 3, 4 ]
 * ```
 *
 * @param n
 */
export function takeWhile<T>(pred: Predicate<T>): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        let ok = true;
        return compR(rfn,
            (acc, x) => (ok = ok && pred(x)) ? r(acc, x) : reduced(acc));
    };
}
