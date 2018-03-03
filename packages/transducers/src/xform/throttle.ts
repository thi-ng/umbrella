import { StatefulPredicate } from "@thi.ng/api/api";

import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

/**
 * Similar to `filter`, but works with possibly stateful predicates
 * to achieve rate limiting capabilities. Emits only values when
 * predicate returns a truthy value.
 *
 * To support multiple instances of stateful predicates, the predicate
 * itself must be wrapped in a no-arg function, which is called when
 * the transducer initializes. Any stateful initialization of the
 * predicate MUST be done in this function and the function MUST
 * return a 1-arg function, the actual predicate applied to each value.
 *
 * Also see: `throttleTime()`.
 *
 * @param pred
 */
export function throttle<T>(pred: StatefulPredicate<T>): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        const _pred = pred();
        return compR(rfn,
            (acc, x) => _pred(x) ? r(acc, x) : acc);
    };
}
