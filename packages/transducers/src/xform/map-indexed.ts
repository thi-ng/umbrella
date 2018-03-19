import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

export function mapIndexed<A, B>(fn: (i: number, x: A) => B, offset = 0): Transducer<A, B> {
    return (rfn: Reducer<any, B>) => {
        const r = rfn[2];
        let i = offset;
        return compR(rfn,
            (acc, x: A) => r(acc, fn(i++, x)));
    };
}
