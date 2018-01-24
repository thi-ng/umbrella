import { Reducer, Transducer } from "../api";
import { compR } from "../func/comp";

export function benchmark(): Transducer<any, number> {
    return (rfn: Reducer<any, number>) => {
        const r = rfn[2];
        let prev = Date.now();
        return compR(rfn,
            (acc, _) => {
                let t = Date.now(),
                    x = t - prev;
                prev = t;
                return r(acc, x);
            });
    };
}
