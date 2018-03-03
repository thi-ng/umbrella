import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

export function sample<T>(prob: number): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        return compR(rfn,
            (acc, x) => Math.random() < prob ? r(acc, x) : acc);
    }
}
