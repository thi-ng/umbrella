import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { ensureReduced, reduced } from "../reduced";

export function take<T>(n: number): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        let m = n;
        return compR(rfn,
            (acc, x) => --m > 0 ? r(acc, x) :
                m === 0 ? ensureReduced(r(acc, x)) :
                    reduced(acc));
    }
}
