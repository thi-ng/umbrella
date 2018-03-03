import { Predicate } from "@thi.ng/api";

import { Reducer, Transducer } from "../api";
import { compR } from "../func/compr";

export function filter<T>(pred: Predicate<T>): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        return compR(rfn,
            (acc, x) => pred(x) ? r(acc, x) : acc);
    }
}
