import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Reducer, Transducer } from "./api";
import { compR } from "./compr";
import { iterator1 } from "./iterator";

/**
 * Stateful transducer. Ignores the actual input values, but
 * produces time measurements since last value processed,
 * e.g. for use in async usage contexts.
 *
 * @example
 * ```ts
 * import { fromInterval, trace } from "@thi.ng/rstream";
 *
 * fromInterval(1000).subscribe(
 *   trace(),
 *   { xform: comp(benchmark(), movingAverage(60)) }
 * )
 * ```
 */
export function benchmark(): Transducer<any, number>;
export function benchmark(src: Iterable<any>): IterableIterator<number>;
export function benchmark(src?: Iterable<any>): any {
    return isIterable(src)
        ? iterator1(benchmark(), src)
        : (rfn: Reducer<any, number>) => {
              const r = rfn[2];
              let prev = Date.now();
              return compR(rfn, (acc, _) => {
                  const t = Date.now();
                  const x = t - prev;
                  prev = t;
                  return r(acc, x);
              });
          };
}
