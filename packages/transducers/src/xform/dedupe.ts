import { Reducer, Transducer, SEMAPHORE } from "../api";
import { compR } from "../func/comp";

export function dedupe<T>(equiv?: (a: T, b: T) => boolean): Transducer<T, T> {
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
