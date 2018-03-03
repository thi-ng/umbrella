import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { identity } from "../func/identity";

export function keep<T>(f: ((x: T) => any) = identity): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        return compR(rfn,
            (acc, x) => f(x) != null ? r(acc, x) : acc);
    }
}
