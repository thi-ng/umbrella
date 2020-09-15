import type { Predicate } from "@thi.ng/api";
import { isIterable } from "@thi.ng/checks";
import type { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { iterator1 } from "../iterator";

export function filter<T>(pred: Predicate<T>): Transducer<T, T>;
export function filter<T>(
    pred: Predicate<T>,
    src: Iterable<T>
): IterableIterator<T>;
export function filter<T>(pred: Predicate<T>, src?: Iterable<T>): any {
    return isIterable(src)
        ? iterator1(filter(pred), src)
        : (rfn: Reducer<any, T>) => {
              const r = rfn[2];
              return compR(rfn, (acc, x: T) => (pred(x) ? r(acc, x) : acc));
          };
}
