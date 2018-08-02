import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

/**
 * Transducer which only yields values with given `prob` probability
 * (0.0 .. 1.0 range).
 *
 * ```
 * // 10% probability
 * [...iterator(sample(0.1), range(100))]
 * // [ 3, 24, 25, 36, 43, 49, 59, 64, 82, 86, 89 ]
 * ```
 *
 * @param prob
 */
export function sample<T>(prob: number): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        return compR(rfn,
            (acc, x) => Math.random() < prob ? r(acc, x) : acc);
    }
}
