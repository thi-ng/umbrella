import type { Predicate } from "@thi.ng/api";
import type { Reducer, Transducer } from "../api";
import { $iter, iterator } from "../iterator";
import { isReduced } from "../reduced";

/**
 * Transducer. Applies given predicate `pred` to each incoming value and
 * collects values until the return value of the `fn` is truthy. Once this
 * happens yields chunk of buffered values.
 *
 * @example
 * ```ts
 * [...partitionWhen((x) => !!x, [0, 1, 0, 0, 1, 1, 0, 1])]
 * // [ [ 0 ], [ 1, 0, 0 ], [ 1 ], [ 1, 0 ], [ 1 ] ]
 * ```
 *
 * @param pred -
 * @param stateful -
 */
export function partitionWhen<T>(
    pred: Predicate<T> | (() => Predicate<T>),
    stateful?: boolean
): Transducer<T, T[]>;
export function partitionWhen<T>(
    pred: Predicate<T> | (() => Predicate<T>),
    src: Iterable<T>
): IterableIterator<T[]>;
export function partitionWhen<T>(
    pred: Predicate<T> | (() => Predicate<T>),
    stateful: boolean,
    src: Iterable<T>
): IterableIterator<T[]>;
export function partitionWhen<T>(...args: any[]): any {
    return (
        $iter(partitionWhen, args, iterator) ||
        (([init, complete, reduce]: Reducer<any, T[]>) => {
            const pred: Predicate<T> | (() => Predicate<T>) = args[0];
            const f = args[1] === true ? (<() => Predicate<T>>pred)() : pred;
            let chunk: T[] | null;
            return <Reducer<any, T>>[
                init,
                (acc) => {
                    if (chunk && chunk.length) {
                        acc = reduce(acc, chunk);
                        chunk = null;
                    }
                    return complete(acc);
                },
                (acc, x) => {
                    if (f(x)) {
                        chunk && (acc = reduce(acc, chunk));
                        chunk = isReduced(acc) ? null : [x];
                    } else {
                        chunk ? chunk.push(x) : (chunk = [x]);
                    }
                    return acc;
                },
            ];
        })
    );
}
