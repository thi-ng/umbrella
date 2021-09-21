import type { Fn, Fn0 } from "@thi.ng/api";
import type { Reducer, Transducer } from "./api";
import { compR } from "./compr";
import { __iter } from "./iterator";

export interface DistinctOpts<T> {
    /**
     * Key extractor function.
     */
    key: Fn<T, any>;
    /**
     * Cache factory. Must produce a ES6 Set-like instance used to keep
     * track of seen key values.
     */
    cache: Fn0<Set<any>>;
}

/**
 * @example
 * ```ts
 * [...distinct({ key: (x) => x.id }, [{id: 1, x: 2}, {id: 1, x: 3}])]
 * // [ { id: 1, x: 2 } ]
 * ```
 *
 * @param opts -
 */
export function distinct<T>(opts?: Partial<DistinctOpts<T>>): Transducer<T, T>;
export function distinct<T>(src: Iterable<T>): IterableIterator<T>;
export function distinct<T>(
    opts: Partial<DistinctOpts<T>>,
    src: Iterable<T>
): IterableIterator<T>;
export function distinct<T>(...args: any[]): any {
    return (
        __iter(distinct, args) ||
        ((rfn: Reducer<any, T>) => {
            const r = rfn[2];
            const opts = <DistinctOpts<T>>(args[0] || {});
            const key = opts.key;
            const seen = (opts.cache || (() => new Set()))();
            return compR(
                rfn,
                key
                    ? (acc, x: T) => {
                          const k = key(x);
                          return !seen.has(k) ? (seen.add(k), r(acc, x)) : acc;
                      }
                    : (acc, x: T) =>
                          !seen.has(x) ? (seen.add(x), r(acc, x)) : acc
            );
        })
    );
}
