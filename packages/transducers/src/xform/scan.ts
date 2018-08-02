import { Reducer, Transducer } from "../api";
import { ensureReduced, isReduced, unreduced } from "../reduced";

/**
 * Transducer which performs "scan" operation via given reducer.
 *
 * https://en.wikipedia.org/wiki/Prefix_sum#Scan_higher_order_function
 *
 * ```
 * [...iterator(scan(add()), range(10))]
 * // [ 0, 1, 3, 6, 10, 15, 21, 28, 36, 45 ]
 * ```
 *
 * @param rfn reducer used as scan operator
 */
export function scan<A, B>([initi, completei, reducei]: Reducer<B, A>): Transducer<A, B> {
    return ([inito, completeo, reduceo]: Reducer<any, B>) => {
        let acc = initi();
        return [
            inito,
            (_acc) => {
                let a = completei(acc);
                if (a !== acc) {
                    _acc = unreduced(reduceo(_acc, a));
                }
                acc = a;
                return completeo(_acc);
            },
            (_acc, x) => {
                acc = <any>reducei(acc, x);
                if (isReduced(acc)) {
                    return ensureReduced(reduceo(_acc, (<any>acc).deref()));
                }
                return reduceo(_acc, acc);
            }
        ];
    };
}
