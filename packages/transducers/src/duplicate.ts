import { isIterable } from "@thi.ng/checks/is-iterable";
import type { Reducer, Transducer } from "./api.js";
import { compR } from "./compr.js";
import { iterator } from "./iterator.js";
import { isReduced } from "./reduced.js";

export function duplicate<T>(n?: number): Transducer<T, T>;
export function duplicate<T>(n: number, src: Iterable<T>): IterableIterator<T>;
export function duplicate<T>(n = 1, src?: Iterable<T>): any {
    return isIterable(src)
        ? iterator(duplicate(n), src)
        : (rfn: Reducer<any, T>) => {
              const r = rfn[2];
              return compR(rfn, (acc, x: T) => {
                  for (let i = n; i >= 0 && !isReduced(acc); i--) {
                      acc = r(acc, x);
                  }
                  return acc;
              });
          };
}
