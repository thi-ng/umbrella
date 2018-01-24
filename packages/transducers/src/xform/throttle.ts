import { Reducer, Transducer } from "../api";
import { compR } from "../func/comp";

export function throttle<T>(delay: number): Transducer<T, T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        let last = 0;
        return compR(rfn,
            (acc, x) => {
                const t = Date.now();
                if (t - last >= delay) {
                    last = t;
                    acc = r(acc, x);
                }
                return acc;
            });
    };
}
