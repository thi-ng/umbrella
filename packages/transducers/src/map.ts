import type { Fn } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Reducer, Transducer } from "./api";
import { compR } from "./compr";
import { iterator1 } from "./iterator";

/**
 * Transducer. Applies mapping function `fn` to each received value and
 * passes result downstream to next reducer.
 *
 * @example
 * ```ts
 * [...map((x) => x * 10, [1, 2, 3])]
 * // [ 10, 20, 30 ]
 * ```
 *
 * @param fn - transformation function
 */
export function map<A, B>(fn: Fn<A, B>): Transducer<A, B>;
export function map<A, B>(fn: Fn<A, B>, src: Iterable<A>): IterableIterator<B>;
export function map<A, B>(fn: Fn<A, B>, src?: Iterable<A>): any {
    return isIterable(src)
        ? iterator1(map(fn), src)
        : (rfn: Reducer<any, B>) => {
              const r = rfn[2];
              return compR(rfn, (acc, x: A) => r(acc, fn(x)));
          };
}
