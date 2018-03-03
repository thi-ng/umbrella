import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { isReduced } from "../reduced";

export function interleave<A, B>(sep: B | (() => B)): Transducer<A, A | B> {
    return (rfn: Reducer<any, A | B>) => {
        const r = rfn[2];
        const _sep = typeof sep === "function" ? sep : () => sep;
        return compR(rfn,
            (acc, x) => {
                acc = r(acc, _sep());
                return isReduced(acc) ? acc : r(acc, x);
            });
    };
}
