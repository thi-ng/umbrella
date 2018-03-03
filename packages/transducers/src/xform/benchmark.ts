import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

/**
 * Stateful transducer. Ignores the actual input values, but
 * produces time measurements since last value processed,
 * e.g. for use in async usage contexts.
 *
 * ```
 * // example using @thi.ng/rstream
 * rstream
 *     .fromInterval(1000)
 *     .subscribe(
 *         rstream.trace(),
 *         comp(benchmark(), movingAverage(60))
 *     )
 * ```
 */
export function benchmark(): Transducer<any, number> {
    return (rfn: Reducer<any, number>) => {
        const r = rfn[2];
        let prev = Date.now();
        return compR(rfn,
            (acc, _) => {
                const t = Date.now();
                const x = t - prev;
                prev = t;
                return r(acc, x);
            });
    };
}
