import { Predicate } from "@thi.ng/api/api";
import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

export function dropWhile<T>(pred: Predicate<T>): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        let ok = true;
        return compR(rfn,
            (acc, x) => (ok = ok && pred(x)) ? acc : r(acc, x));
    };
}
