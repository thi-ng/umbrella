import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

export function drop<T>(n: number): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        let m = n;
        return compR(rfn,
            (acc, x) => m > 0 ? (m-- , acc) : r(acc, x));
    };
}
