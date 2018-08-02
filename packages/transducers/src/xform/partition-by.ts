import { SEMAPHORE, Transducer } from "../api";
import { isReduced } from "../reduced";

/**
 * Transducer. Applies given `fn` to each incoming value and collects
 * values until the return value of the `fn` has changed. Once this
 * happens yields chunk of buffered values.
 *
 * ```
 * [...iterator(partitionBy((x) => x & 1), [1, 2, 4, 6, 3, 5, 8, 4])]
 * // [ [ 1 ], [ 2, 4, 6 ], [ 3, 5 ], [ 8, 4 ] ]
 * ```
 *
 * @param fn
 * @param stateful
 */
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
