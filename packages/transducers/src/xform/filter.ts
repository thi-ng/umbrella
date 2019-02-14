import { Predicate } from "@thi.ng/api";

import { Reducer, Transducer } from "../api";
import { iterator1 } from "../iterator";
import { compR } from "../func/compr";

export function filter<T>(pred: Predicate<T>): Transducer<T, T>;
export function filter<T>(pred: Predicate<T>, src: Iterable<T>): IterableIterator<T>;
export function filter<T>(pred: Predicate<T>, src?: Iterable<T>): any {
    return src ?
        iterator1(filter(pred), src) :
        (rfn: Reducer<any, T>) => {
            const r = rfn[2];
            return compR(rfn,
                (acc, x: T) => pred(x) ? r(acc, x) : acc);
        }
}
