import { Reducer, Transducer } from "../api";
import { compR } from "../func/comp";
import { isReduced } from "../reduced";

export function cat<T>(): Transducer<T[], T> {
    return (rfn: Reducer<any, T>) => {
        const r = rfn[2];
        return compR(rfn,
            (acc, x: T[]) => {
                if (x) {
                    for (let y of x) {
                        acc = r(acc, y);
                        if (isReduced(acc)) {
                            break;
                        }
                    }
                }
                return acc;
            });
    };
}
