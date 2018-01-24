import { Reducer, Transducer } from "../api";
import { compR } from "../func/comp";

export function takeNth<T>(n: number): Transducer<T, T> {
    n--;
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        let skip = 0;
        return compR(rfn,
            (acc, x) => {
                if (skip === 0) {
                    skip = n;
                    return r(acc, x);
                }
                skip--;
                return acc;
            });
    };
}
