import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { isReduced } from "../reduced";

export function cat<T>(): Transducer<Iterable<T>, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        return compR(rfn,
            (acc, x: Iterable<T>) => {
                if (x) {
                    for (let y of x) {
                        acc = r(acc, y);
                        if (isReduced(acc)) {
                            break;
                        }
                    }
                }
                return acc;
            });
    };
}
