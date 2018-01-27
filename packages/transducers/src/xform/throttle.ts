import { Predicate } from "@thi.ng/api/api";

import { Reducer, Transducer } from "../api";
import { compR } from "../func/comp";

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
export function throttle<T>(pred: () => Predicate<T>): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        const _pred = pred();
        return compR(rfn,
            (acc, x) => _pred(x) ? r(acc, x) : acc);
    };
}

/**
 * Time-based version of `throttle`. Ignores any new values in the
 * `delay` interval since the last accepted value.
 *
 * **Only to be used in async contexts and NOT with `transduce` directly.**
 *
 * Also see: `@thi.ng/rstream` and `@thi.ng/csp` packages.
 *
 * @param delay
 */
export function throttleTime<T>(delay: number): Transducer<T, T> {
    return throttle<T>(
        () => {
            let last = 0;
            return () => {
                const t = Date.now();
                return t - last >= delay ? (last = t, true) : false;
            };
        });
}
