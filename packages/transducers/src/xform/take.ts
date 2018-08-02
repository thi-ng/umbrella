import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { ensureReduced, reduced } from "../reduced";

/**
 * Transducer which only yields the first `n` values and then terminates
 * transformation (by emitting a `reduced()` value).
 *
 * ```
 * [...iterator(comp(take(5), map((x) => x * 10)), range(10))]
 * // [ 0, 10, 20, 30, 40 ]
 * ```
 *
 * @param n
 */
export function take<T>(n: number): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        let m = n;
        return compR(rfn,
            (acc, x) => --m > 0 ? r(acc, x) :
                m === 0 ? ensureReduced(r(acc, x)) :
                    reduced(acc));
    }
}
