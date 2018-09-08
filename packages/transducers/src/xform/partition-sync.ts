import { IObjectOf } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";

import { Reducer, Transducer } from "../api";
import { identity } from "../func/identity";
import { $iter, iterator } from "../iterator";

export interface PartitionSyncOpts<T> {
    key: (x: T) => PropertyKey;
    mergeOnly: boolean;
    reset: boolean;
    all: boolean;
}

/**
 * This transducer is intended for synchronization and provenance
 * tracking of possibly previously merged inputs. It partitions the
 * input into labeled tuple objects with the object keys obtained from
 * the user provided `keyfn` (which is applied to each input value).
 *
 * By default, a new result is only produced once values from **all**
 * given labeled sources have been received. Only labels contained in
 * the provided key set are allowed, others are skipped. The tuples will
 * contain the most recent consumed value from each labeled input. In
 * dataflow scenarios this can be used to ensure a subsequent operation
 * consuming these tuples has all necessary inputs, regardless of the
 * individual rates of change of each original (pre-merge) input.
 *
 * If the `mergeOnly` option is set to true (default: false), **no**
 * synchronization (waiting) of inputs is applied and potentially
 * partially populated tuple objects will be emitted for each received
 * input value, however as with the default behavior, tuples will retain
 * the most recent consumed value from other inputs.
 *
 * ```
 * src = [
 *   ["a", 1], ["a", 2], ["d", 100], ["b", 10],
 *   ["b", 11], ["c", 0], ["a", 3]
 * ];
 *
 * // form tuples for values only from sources "a" & "b"
 * // here the label is the first element of each input item
 * [...partitionSync(["a", "b"], { key: (x) => x[0] }, src)]
 * // [ { a: ["a", 2], b: ["b", 10] },
 * //   { b: ["b", 11], a: ["a", 3] } ]
 * ```
 *
 * In addition to the default mode of operation, i.e. waiting for new
 * values from *all* named inputs before a new tuple is produced, the
 * behavior for *all but the first tuple* can be changed to emit new
 * tuples as soon as a new value with a qualifying label has become
 * available (with other values in the tuple remaining). Compare with
 * above example:
 *
 * ```
 * // passing `false` to disable tuple reset
 * [...partitionSync(
 *   ["a", "b"],
 *   {
 *     key: (x) => x[0],
 *     reset: false
 *   },
 *   src
 * )]
 * // [ { a: ["a", 2], b: ["b", 10] },
 * //   { a: ["a", 2], b: ["b", 11] },
 * //   { a: ["a", 3], b: ["b", 11] } ]
 *
 * By default, the last emitted tuple is allowed to be incomplete (in
 * case the input closed). To only allow complete tuples, set the
 * optional `all` arg to false.
 *
 * Note: If the `keys` set of allowed labels is modified externally, the
 * tuple size will adjust accordingly (only if given as set, will not work
 * if keys are provided as array).
 *
 * @param keys allowed label set
 * @param keyfn label extraction function
 * @param reset true if each tuple should contain only new values
 * @param all true if last tuple is allowed to be incomplete
 */
export function partitionSync<T>(keys: PropertyKey[] | Set<PropertyKey>, opts?: Partial<PartitionSyncOpts<T>>): Transducer<T, IObjectOf<T>>;
export function partitionSync<T>(keys: PropertyKey[] | Set<PropertyKey>, src: Iterable<T>): IterableIterator<IObjectOf<T>>;
export function partitionSync<T>(keys: PropertyKey[] | Set<PropertyKey>, opts: Partial<PartitionSyncOpts<T>>, src: Iterable<T>): IterableIterator<IObjectOf<T>>;
export function partitionSync<T>(...args: any[]): any {
    return $iter(partitionSync, args, iterator) ||
        (([init, complete, reduce]: Reducer<any, IObjectOf<T>>) => {
            let curr = {};
            let first = true;
            const currKeys = new Set<PropertyKey>();
            const { key, mergeOnly, reset, all } = <PartitionSyncOpts<T>>{
                key: <any>identity,
                mergeOnly: false,
                reset: true,
                all: true,
                ...args[1]
            };
            const ks = isArray(args[0]) ? new Set(args[0]) : args[0];
            return [
                init,
                (acc) => {
                    if ((reset && all && currKeys.size > 0) || (!reset && first)) {
                        acc = reduce(acc, curr);
                        curr = undefined;
                        currKeys.clear();
                        first = false;
                    }
                    return complete(acc);
                },
                (acc, x: T) => {
                    const k = key(x);
                    if (ks.has(k)) {
                        curr[k] = x;
                        currKeys.add(k);
                        if (mergeOnly || currKeys.size >= ks.size) {
                            acc = reduce(acc, curr);
                            first = false;
                            if (reset) {
                                curr = {};
                                currKeys.clear();
                            } else {
                                curr = { ...curr };
                            }
                        }
                    }
                    return acc;
                }];
        });
}