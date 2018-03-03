import { Predicate2 } from "@thi.ng/api/api";

import { Reducer, Transducer, SEMAPHORE } from "../api";
import { compR } from "../func/compr";

export function dedupe<T>(equiv?: Predicate2<T>): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        let prev: any = SEMAPHORE;
        return compR(rfn,
            equiv ?
                (acc, x) => {
                    acc = equiv(prev, x) ? acc : r(acc, x);
                    prev = x;
                    return acc;
                } :
                (acc, x) => {
                    acc = prev === x ? acc : r(acc, x);
                    prev = x;
                    return acc;
                });
    };
}
