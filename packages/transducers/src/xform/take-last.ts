import { Reducer, Transducer } from "../api";
import { isReduced } from "../reduced";

export function takeLast<T>(n: number): Transducer<T, T> {
    return ([init, complete, reduce]: Reducer<any, T>) => {
        const buf: T[] = [];
        return [
            init,
            (acc) => {
                while (buf.length && !isReduced(acc)) {
                    acc = reduce(acc, buf.shift());
                }
                return complete(acc);
            },
            (acc, x) => {
                if (buf.length === n) {
                    buf.shift();
                }
                buf.push(x);
                return acc;
            }
        ];
    }
}
