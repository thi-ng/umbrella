import { SEMAPHORE, Transducer } from "../api";
import { isReduced } from "../reduced";

export function partitionBy<T>(fn: (x?: T) => any, stateful = false): Transducer<T, T[]> {
    return ([init, complete, reduce]) => {
        const f = stateful ? fn() : fn;
        let prev: any = SEMAPHORE,
            chunk;
        return [
            init,
            (acc) => {
                if (chunk && chunk.length) {
                    acc = reduce(acc, chunk);
                    chunk = null;
                }
                return complete(acc);
            },
            (acc, x) => {
                const curr = f(x);
                if (prev === SEMAPHORE) {
                    prev = curr;
                    chunk = [x];
                } else if (curr === prev) {
                    chunk.push(x);
                } else {
                    chunk && (acc = reduce(acc, chunk));
                    chunk = isReduced(acc) ? null : [x];
                    prev = curr;
                }
                return acc;
            }];
    };
}
