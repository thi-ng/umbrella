import { Predicate } from "@thi.ng/api/api";
import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";
import { reduced } from "../reduced";

export function takeWhile<T>(pred: Predicate<T>): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        let ok = true;
        return compR(rfn,
            (acc, x) => (ok = ok && pred(x)) ? r(acc, x) : reduced(acc));
    };
}
