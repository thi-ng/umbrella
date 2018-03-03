import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { identity } from "../func/identity";

export function distinct<T>(mapfn: ((x: T) => any) = identity): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        const seen = new Set<any>();
        return compR(rfn,
            mapfn ?
                (acc, x) => {
                    const k = mapfn(x);
                    return !seen.has(k) ? (seen.add(k), r(acc, x)) : acc;
                } :
                (acc, x) => !seen.has(x) ? (seen.add(x), r(acc, x)) : acc
        );
    };
}
