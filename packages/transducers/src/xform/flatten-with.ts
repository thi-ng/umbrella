import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { isReduced } from "../reduced";

export function flattenWith<T>(fn: (x: T) => Iterable<T>): Transducer<T | Iterable<T>, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
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
            return r(acc, x);
        };
        return compR(rfn, flatten);
    };
}
