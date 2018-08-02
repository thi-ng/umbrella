import { Reducer, Transducer } from "../api";
import { isReduced } from "../reduced";

/**
 * Ensures the total number of transformed values will be multiples
 * of `n`. Only makes sense for finite streams / reductions. Does nothing
 * if the to be transformed data source has exactly multiple of `n`
 * values, but if not pads / supplies additional `fill` values at the end
 * until the next multiple is reached. No padding takes place if input
 * is empty, since length 0 is always a multiple.
 *
 * ```
 * [...iterator(padLast(8, 0), [1, 2, 3, 4, 5])]
 * // [ 1, 2, 3, 4, 5, 0, 0, 0 ]
 *
 * [...iterator(padLast(8, 0), [1])]
 * // [ 1, 0, 0, 0, 0, 0, 0, 0 ]
 *
 * [...iterator(padLast(8, 0), [])]
 * // []
 *
 * [...iterator(padLast(2, 0), [1, 2, 3])]
 * // [ 1, 2, 3, 0 ]
 *
 * [...iterator(padLast(2, 0), [1, 2, 3, 4])]
 * // [ 1, 2, 3, 4 ]
 * ```
 *
 * @param n
 * @param fill
 */
export function padLast<T>(n: number, fill: T): Transducer<T, T> {
    return ([init, complete, reduce]: Reducer<any, T>) => {
        let m = 0;
        return [
            init,
            (acc) => {
                let rem = m % n;
                if (rem > 0) {
                    while (++rem <= n && !isReduced(acc)) {
                        acc = reduce(acc, fill);
                    }
                }
                return complete(acc);
            },
            (acc, x) => (m++ , reduce(acc, x))
        ];
    };
}
