import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { isReduced } from "../reduced";

export function duplicate<T>(n = 1): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        return compR(rfn,
            (acc, x) => {
                for (let i = n; i >= 0 && !isReduced(acc); i--) {
                    acc = r(acc, x);
                }
                return acc;
            });
    }
}
