import { Reducer, Transducer } from "../api";
import { compR } from "../func/comp";

export function dropNth<T>(n: number): Transducer<T, T> {
    n--;
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        let skip = n;
        return compR(rfn,
            (acc, x) => skip-- > 0 ? r(acc, x) : (skip = n, acc));
    };
}
