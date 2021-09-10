import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Transducer } from "../api";
import { iterator } from "../iterator";
import { partitionBy } from "./partition-by";

/**
 * Transducer. Yields tumbling, non-overlapping windows/partitions of
 * input values, with the window size defined by given realtime `period`
 * (in milliseconds).
 *
 * @remarks
 * Only to be used in async contexts, NOT with {@link (transduce:1)}
 * directly.
 *
 * Also see:
 * - {@link @thi.ng/rstream# | @thi.ng/rstream}
 * - {@link @thi.ng/csp# | @thi.ng/csp}.
 *
 * @example
 * ```ts
 * import { fromInterval, trace } from "@thi.ng/rstream";
 *
 * // stream emits
 * fromInterval(250)
 *   .transform(partitionTime(1000))
 *   .subscribe(trace())
 * // [ 0, 1, 2, 3 ]
 * // [ 4, 5, 6, 7 ]
 * // [ 8, 9, 10, 11 ]
 * // [ 12, 13, 14, 15 ]
 * // ...
 * ```
 *
 * @param period - window size (in ms)
 */
export function partitionTime<T>(period: number): Transducer<T, T[]>;
export function partitionTime<T>(
    period: number,
    src: Iterable<T>
): IterableIterator<T[]>;
export function partitionTime<T>(period: number, src?: Iterable<T>): any {
    return isIterable(src)
        ? iterator(partitionTime(period), src)
        : partitionBy(() => {
              let last = 0;
              return () => {
                  const t = Date.now();
                  t - last >= period && (last = t);
                  return last;
              };
          }, true);
}
