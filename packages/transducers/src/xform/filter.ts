import { isIterable } from "@thi.ng/checks";
import { compR } from "../func/compr";
import { iterator1 } from "../iterator";
import type { Predicate } from "@thi.ng/api";
import type { Reducer, Transducer } from "../api";

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
