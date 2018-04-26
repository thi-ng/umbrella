import { Reducer, Transducer } from "../api";
import { shuffleN } from "../func/shuffle";
import { isReduced } from "../reduced";

export function streamShuffle<T>(n: number, maxSwaps = n): Transducer<T, T> {
    return ([init, complete, reduce]: Reducer<any, T>) => {
        const buf: T[] = [];
        return [
            init,
            (acc) => {
                while (buf.length && !isReduced(acc)) {
                    shuffleN(buf, maxSwaps);
                    acc = reduce(acc, buf.shift());
                }
                acc = complete(acc);
                return acc;
            },
            (acc, x) => {
                buf.push(x);
                shuffleN(buf, maxSwaps);
                if (buf.length === n) {
                    acc = reduce(acc, buf.shift());
                }
                return acc;
            }
        ];
    };
}
