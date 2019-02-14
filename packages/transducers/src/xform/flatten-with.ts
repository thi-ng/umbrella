import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { iterator } from "../iterator";
import { isReduced } from "../reduced";

export function flattenWith<T>(fn: (x: T) => Iterable<T>): Transducer<T | Iterable<T>, T>;
export function flattenWith<T>(fn: (x: T) => Iterable<T>, src: Iterable<T | Iterable<T>>): IterableIterator<T>;
export function flattenWith<T>(fn: (x: T) => Iterable<T>, src?: Iterable<T | Iterable<T>>): any {
    return src ?
        iterator(flattenWith(fn), src) :
        (rfn: Reducer<any, T>) => {
            const reduce = rfn[2];
            const flatten = (acc, x) => {
                const xx = fn(x);
                if (xx) {
                    for (let y of xx) {
                        acc = flatten(acc, y);
                        if (isReduced(acc)) {
                            break;
                        }
                    }
                    return acc;
                }
                return reduce(acc, x);
            };
            return compR(rfn, flatten);
        };
}
