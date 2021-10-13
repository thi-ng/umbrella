import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { iterator1 } from "./iterator.js";

export function drop<T>(n: number): Transducer<T, T>;
export function drop<T>(n: number, src: Iterable<T>): IterableIterator<T>;
export function drop<T>(n: number, src?: Iterable<T>): any {
    return isIterable(src)
        ? iterator1(drop(n), src)
        : (rfn: Reducer<any, T>) => {
              const r = rfn[2];
              let m = n;
              return compR(rfn, (acc, x: T) =>
                  m > 0 ? (m--, acc) : r(acc, x)
              );
          };
}
