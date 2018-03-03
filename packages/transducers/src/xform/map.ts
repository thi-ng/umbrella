import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

export function map<A, B>(fn: (x: A) => B): Transducer<A, B> {
    return (rfn: Reducer<any, B>) => {
        const r = rfn[2];
        return compR(rfn,
            (acc, x: A) => r(acc, fn(x)));
    };
}
