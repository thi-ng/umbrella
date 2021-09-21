import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Reducer, Transducer } from "./api";
import { __drain } from "./internal/drain";
import { iterator } from "./iterator";

/**
 * Transducer which only yields the last `n` values. Assumes
 * input source is finite (of course).
 *
 * @example
 * ```ts
 * [...takeLast(3, range(10))]
 * // [ 7, 8, 9 ]
 * ```
 *
 * @param n -
 * @param src -
 */
export function takeLast<T>(n: number): Transducer<T, T>;
export function takeLast<T>(n: number, src: Iterable<T>): IterableIterator<T>;
export function takeLast<T>(n: number, src?: Iterable<T>): any {
    return isIterable(src)
        ? iterator(takeLast(n), src)
        : ([init, complete, reduce]: Reducer<any, T>) => {
              const buf: T[] = [];
              return <Reducer<any, T>>[
                  init,
                  __drain(buf, complete, reduce),
                  (acc, x) => {
                      if (buf.length === n) {
                          buf.shift();
                      }
                      buf.push(x);
                      return acc;
                  },
              ];
          };
}
